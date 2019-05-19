import React from 'react';
import { fireEvent, cleanup, render } from 'react-testing-library';

import Text, { ITransformation } from './Text';

const FAKE_TRANSFORMATIONS: ITransformation[] = [
  {
    name: 'UPPERCASE',
    transformation: (str: string) => str.toUpperCase(),
    addQuotes: true,
  },
  {
    name: 'lowercase',
    transformation: (str: string) => str.toLowerCase(),
    addQuotes: true,
  },
];

const setup = () => {
  const utils = render(
    <Text transformations={FAKE_TRANSFORMATIONS} />
  );

  const input = utils.getByLabelText('Text to transform');
  const results = utils.getAllByTestId('result');
  const noQuotesSwitch = utils.getByLabelText('No quotes');
  const singleQuotesSwitch = utils.getByLabelText('Single quotes');
  const doubleQuotesSwitch = utils.getByLabelText('Double quotes');

  return {
   input,
   results,
   noQuotesSwitch,
   singleQuotesSwitch,
   doubleQuotesSwitch,
    ...utils,
  };
};

afterEach(cleanup);

describe('Text', () => {
  const INPUT = 'test text'

  test('shows correct number of result fields', () => {
    const { results } = setup();
    expect(results).toHaveLength(FAKE_TRANSFORMATIONS.length);
  });

  test('shows the correct headers', () => {
    const { results } = setup();

    results.forEach((res, i) => {
      const header = res.querySelector('[data-testid=result-header]');
      expect(header.textContent).toEqual(FAKE_TRANSFORMATIONS[i].name);
    });
  });

  test('transforms text correctly', function() {
    const { results, input } = setup();

    fireEvent.change(input, { target: { value: INPUT } });

    results.forEach((res, i) => {
      const output = res.querySelector('[data-testid=result-output]');
      expect(output.textContent).toEqual(FAKE_TRANSFORMATIONS[i].transformation(INPUT));
    });
  });

  describe('changing quotes', () => {
    function checkQuotes(input: any, results: any[], switchBtn: any, regex: RegExp) {
      fireEvent.change(input, { target: { value: INPUT } });
      fireEvent.click(switchBtn);
    
      results.forEach(res => {
        const output = res.querySelector('[data-testid=result-output]');
        expect(output.textContent).toEqual(expect.stringMatching(regex));
      });
    };

    test('selecting single quotes works', () => {
      const { input, results, singleQuotesSwitch } = setup();
      checkQuotes(input, results, singleQuotesSwitch, /(').*\1/);
    });

    test('selecting double quotes works', () => {
      const { input, results, doubleQuotesSwitch } = setup();
      checkQuotes(input, results, doubleQuotesSwitch, /(").*\1/);
    });
  });
});
