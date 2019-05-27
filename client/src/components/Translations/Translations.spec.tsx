import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Translations from './Translations';

const setup = () => {
  const utils = render(
    <Translations />
  );

  const input = utils.getByLabelText('Text to translate');
  const inputLangSelect = utils.getAllByLabelText('Language');
  const result = utils.getByTestId('result');

  return {
   input,
   inputLangSelect,
   result,
    ...utils,
  };
};

describe('Transaltions', () => {
  test('shows the input with placeholder text', () => {
    const { input } = setup();
    expect(input).toHaveAttribute('placeholder', 'Welcome');
  });

  test('shows the result in default output language', () => {
    const { result } = setup();
    expect(result).toBeInTheDocument();

    const output = result.querySelector('[data-testid=result-output]');
    expect(output).toHaveTextContent('Bienvenido');
  });

  // TODO: test if submit calls the correct function with correct input

  // TODO: create service for AJAX (with retryability etc.) that will process the request for language
});