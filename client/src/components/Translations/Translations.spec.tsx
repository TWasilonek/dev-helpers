import React from 'react';
import {
  fireEvent,
  render,
  act,
  cleanup,
  wait,
  waitForDomChange,
} from 'react-testing-library';
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

const selectFromDropdown = async (dropdownElem: HTMLElement, optionIndex: number) => {
  fireEvent.click(dropdownElem);
  await waitForDomChange({ container: dropdownElem })
  fireEvent.click(dropdownElem.querySelectorAll('.item')[optionIndex]);
}

describe('Transaltions', () => {
  beforeEach(() => {
    translationApi.getLanguages.mockResolvedValueOnce({ data: [
      {code: "en", name: "English"},
      {code: "es", name: "Spanish"},
      {code: "pl", name: "Polish"},
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
    test('submits correct data and shows response correctly', async () => {
      translationApi.translate.mockResolvedValueOnce({
        data: {
          es: ['Hola'],
        },
      });
  
      const { input, form, getByTestId } = setup();
      const text = 'Hello';
  
      act(async () => {
        selectFromDropdown(getByTestId('target-language-en'), 1);
        fireEvent.change(input, { target: { value: text } });
        fireEvent.submit(form);
      });

      await wait(() => getByTestId('result-output-es')); 
      checkTranslationOutput(getByTestId('result-output-es'), 'Hola');
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

      const { addLangBtn, getByTestId, input, form, } = setup();
      const text = 'Hello';

      act(async () => {
        // set first lang to spanish
        await selectFromDropdown(getByTestId('target-language-en'), 1);
        // add second lang
        fireEvent.click(addLangBtn);
        // set second lang to pl
        await selectFromDropdown(getByTestId('target-language-en'), 2);

        // type text and submit form
        fireEvent.change(input, { target: { value: text } });
        fireEvent.submit(form);

        // check if changes applied
        await wait(() => getByTestId('result-output-es')); 
        checkTranslationOutput(getByTestId('result-output-es'), 'Hola');
        checkTranslationOutput(getByTestId('result-output-pl'), 'Czesc');

        expect(translationApi.translate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
