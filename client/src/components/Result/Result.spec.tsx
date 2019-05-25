import React from 'react';
import { render } from 'react-testing-library';

import Result from './Result';

const HEADER = 'Header';
const TEXT = 'outptup text';

const setup = () => {
  const utils = render(
    <Result header={HEADER} text={TEXT} />
  );

  const title = utils.getByTestId('result-header');
  const text = utils.getByTestId('result-output');

  return {
    title,
    text,
    ...utils,
  };
};

describe('Result', () => {
  test('shows the inputs in the correct places', () => {
    const { title, text } = setup();

    expect(title).toHaveTextContent(HEADER);
    expect(text).toHaveTextContent(TEXT);
  });
});
