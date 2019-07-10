import React from 'react';
import {
  fireEvent,
  render,
  waitForElement,
  act,
  cleanup,
} from 'react-testing-library';
import Translations from './Translations';
import translationApi from '../../api/translationApi';

translationApi.translate = jest.fn();

const setup = () => {
  const utils = render(<Translations />);

  const form = utils.getByTestId('translation-form');
  const input = utils.getByLabelText('Text to translate');
  const inputLangSelect = utils.getAllByLabelText('Language');
  // const result = utils.getByTestId('result-output');
  // const placeholder = utils.getByTestId('result-placeholder');
  // const submit = utils.getByTestId('submit');

  return {
    form,
    input,
    inputLangSelect,
    // result,
    // placeholder,
    //  submit,
    ...utils,
  };
};

afterEach(cleanup);

const checkTranslationOutput = (elem: Element, expectedText: string) => {
  expect(elem).toBeInTheDocument();
  expect(elem).toHaveTextContent(expectedText);
};

describe('Transaltions', () => {
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

  test('submits the correct data', async () => {
    // TODO: get rid of TS error
    translationApi.translate.mockResolvedValueOnce({
      data: {
        es: ['Hola'],
      },
    });

    const { input, form, getByTestId } = setup();
    const text = 'Hello';
    // const requestBody = {
    //   strings: [text],
    //   langs: ['es'],
    // };

    act(() => {
      fireEvent.change(input, { target: { value: text } });
      fireEvent.submit(form);
    });

    //TODO: we expect the "loading" span to be displayed
    // expect(getByTestId("loading")).toHaveTextContent("Loading data...");
    
    const result = await waitForElement(() => getByTestId('result-output'));
    checkTranslationOutput(result, 'Hola');
    expect(translationApi.translate).toHaveBeenCalledTimes(1);
  });
});
