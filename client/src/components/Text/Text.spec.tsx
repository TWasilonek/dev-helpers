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

  return {
   input,
   results,
    ...utils,
  };
};

afterEach(cleanup);

describe('Text', () => {
  test('shows correct number of result fields', () => {
    const { results } = setup();
    expect(results).toHaveLength(FAKE_TRANSFORMATIONS.length);
  });

  test('shows the correct headers', () => {
    const { results } = setup();

    results.forEach((res, i) => {
      const header = res.querySelector('[data-testid=result-header]');

      expect(header).not.toBeNull();
      expect(header.textContent).toEqual(FAKE_TRANSFORMATIONS[i].name);
    });
  });

  test('transforms text correctly', function() {
    const INPUT = 'test text'
    const { results, input } = setup();

    fireEvent.change(input, { target: { value: INPUT } });

    results.forEach((res, i) => {
      const output = res.querySelector('[data-testid=result-output]');

      expect(output).not.toBeNull();
      expect(output.textContent).toEqual(FAKE_TRANSFORMATIONS[i].transformation(INPUT));
    });
  });

  describe('changing quotes', () => {
    test('selecting single quotes works', () => {
      // TODO:
    });

    test('selecting double quotes works', () => {
      // TODO:
    });
  });
});
