import React from 'react';
import { fireEvent, render, waitForElement } from 'react-testing-library';
import Translations from './Translations';
import translationApiMock from '../../__mocks__/translationApiMock';

const setup = () => {
  const utils = render(
    <Translations />
  );

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

const checkTranslationOutput = (elem: Element, expectedText: string) => {
  const output = elem.querySelector('[data-testid=result-output]');
  expect(output).toHaveTextContent(expectedText);
}

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

  // TODO: test if submit calls the correct function with correct input
  test.only('submits the correct data', async () => {
    translationApiMock.translate.mockRejectedValueOnce({ data: { named: '', unnamed: 'Hola' }});
    // TODO: form is filled
    const { input, form, getByTestId } = setup();
    const text = 'Hello';

    fireEvent.change(input, { target: {  value: text } });
    fireEvent.submit(form);

    // we expect the "loading" span to be displayed
    // expect(getByTestId("loading")).toHaveTextContent("Loading data...");

    // wait for the result to be rendered again (loading is finished)
    const result = await waitForElement(() => getByTestId('result-output'));

    // Now with the resolvedSpan in hand, we can ensure it has the correct content
    // expect(resolvedText).toHaveTextContent('Hola');
    checkTranslationOutput(result, 'Hola');

    // expect(translationApiMock.translate).toHaveBeenCalledTimes(1);
    // expect(translationApiMock.translate).toHaveBeenCalledWith(text);

  });

  // TODO: create service for AJAX (with retryability etc.) that will process the request for language
});