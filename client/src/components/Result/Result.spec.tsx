import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Result from './Result';

const HEADER = 'Header';
const TEXT = 'outptup text';
const PLACEHOLDER = 'placeholder';

const setup = ({
  textString,
  placeholderString
}: {
  textString?: string;
  placeholderString?: string;
}) => {
  const utils = render(
    <Result header={HEADER} text={textString} placeholder={placeholderString} />
  );
  const title = utils.getByTestId('result-header');

  return {
    title,
    ...utils
  };
};

afterEach(cleanup);

describe('Result', () => {
  test('shows the inputs in the correct places', () => {
    const { title, getByTestId } = setup({ textString: TEXT });
    const text = getByTestId('result-output');

    expect(title).toHaveTextContent(HEADER);
    expect(text).toHaveTextContent(TEXT);
  });

  test('when no text is passed, it shows the placeholder', () => {
    const { getByTestId } = setup({
      textString: '',
      placeholderString: PLACEHOLDER
    });
    const placeholder = getByTestId('result-placeholder');

    expect(placeholder).toHaveTextContent(PLACEHOLDER);
  });
});
