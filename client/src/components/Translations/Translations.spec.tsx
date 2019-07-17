import React from 'react';
import {
  fireEvent,
  render,
  waitForElement,
  act,
  cleanup,
  wait,
} from 'react-testing-library';
import userEvent from "@testing-library/user-event";
import Translations from './Translations';
import translationApi from '../../api/translationApi';

translationApi.translate = jest.fn();
translationApi.getLanguages = jest.fn();

const setup = () => {
  const utils = render(<Translations />);

  const form = utils.getByTestId('translation-form');
  const input = utils.getByLabelText('Text to translate');
  const sourceLangSelect = utils.getByLabelText('Source Language');
  const targetLangSelect = utils.getByLabelText('Target Language');
  const addLangBtn = utils.getByText('Add target language');

  return {
    form,
    input,
    sourceLangSelect,
    targetLangSelect,
    addLangBtn,
    ...utils,
  };
};

afterEach(cleanup);

const checkTranslationOutput = (elem: Element, expectedText: string) => {
  expect(elem).toBeInTheDocument();
  expect(elem).toHaveTextContent(expectedText);
};

describe('Transaltions', () => {
  beforeEach(() => {
    translationApi.getLanguages.mockResolvedValueOnce({ data: [
      {code: "en", name: "English"},
      {code: "es", name: "Spanish"},
      {code: "am", name: "Amharic"},
    ]});
  });

  test('shows the input with placeholder text', () => {
    const { input } = setup();
    expect(input).toHaveAttribute('placeholder', 'Welcome');
  });

  test('shows the result in default output language', () => {
    const { getByTestId } = setup();
    const placeholder = getByTestId('result-placeholder');

    expect(placeholder).toBeInTheDocument();
    checkTranslationOutput(placeholder, 'Bienvenido');
  });

  test('retrieves available languages for translation on load', async () => {
    const testLangDropdown = (dropdownElem: HTMLElement, length: number) => {
      act(() => {
        fireEvent.click(dropdownElem);
      });
      const options = dropdownElem.querySelectorAll('[role=option]');
      expect(options).toHaveLength(length);
    }

    const { getByTestId, form } = setup();
    await wait(() => form.querySelector('.dropdown:not(.loading)'));

    expect(translationApi.getLanguages).toHaveBeenCalled();
    testLangDropdown(getByTestId('source-language'), 3);
    testLangDropdown(getByTestId('target-language-en'), 3);
  });

  describe('submit translation', () => {
    test.only('submits correct data and shows response correctly', async () => {
      translationApi.translate.mockResolvedValueOnce({
        data: {
          es: ['Hola'],
        },
      });
  
      const { input, form, getByTestId } = setup();
      const text = 'Hello';
  
      act(async () => {
        // select spanish, this will change the test id to 'target-language-es'
        userEvent.selectOptions(getByTestId('target-language-en'), ['es']);
        userEvent.type(input, text);
        fireEvent.submit(form);
      });

      // expect(translationApi.translate).toHaveBeenCalledTimes(1);
  
      await wait(() => getByTestId('result-output-es')); 
      const result = getByTestId('result-output-es');
      checkTranslationOutput(result, 'Hola');
      expect(translationApi.translate).toHaveBeenCalledTimes(1);
    });
  });

  describe('adding target languages', () => {
    test('can add several target languages', () => {
      const { addLangBtn, getAllByTestId } = setup();

      act(() => {
        fireEvent.click(addLangBtn);
      });

      expect(getAllByTestId('target-lang')).toHaveLength(2);
    });

    test('translations are shown in the correct result field', () => {
      translationApi.translate.mockResolvedValueOnce({
        data: {
          es: ['Hola'],
          pl: ['Czesc'],
        },
      });

      const { addLangBtn, getAllByTestId } = setup();

      act(() => {
        fireEvent.click(addLangBtn);
        // TODO: change the result languages to 'es' and 'pl'
        // submit translations
      });

      // check if results are showing
      expect(true).toBe(false);
    });
  });
});
