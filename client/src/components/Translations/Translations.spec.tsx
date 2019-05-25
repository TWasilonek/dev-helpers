import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Translations from './Translations';

const setup = () => {
  const utils = render(
    <Translations />
  );

  const input = utils.getByLabelText('Text to translate');
  const inputLangSelect = utils.getAllByLabelText('Language');

  return {
   input,
   inputLangSelect,
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
    expect(result).toHaveLength(1);
  });
});