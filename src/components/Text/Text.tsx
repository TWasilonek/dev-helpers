import React, { SFC, Fragment, useState } from 'react';
import { Form, TextArea, Message, Icon } from 'semantic-ui-react';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
  toUpperCase,
  toLowerCase,
  capitalize,
  capitalizeAll,
  snakeCase,
  camelCase,
  pascalCase,
  tranformsLinesToConstants,
  addQuotesToLines,
} from '../../utils/stringTransformations';

// type QuotesTypes = 'noQuotes' | 'single' | 'double' | string;

const QUOTES_TYPES = {
  NO_QUOTES: '',
  SINGLE: '\'',
  DOUBLE: '"',
};

const results = [
  {
    name: 'UPPERCASE',
    transformation: toUpperCase,
    addQuotes: true,
  },
  {
    name: 'lowercase',
    transformation: toLowerCase,
    addQuotes: true,
  },
  {
    name: 'Capitalize first word',
    transformation: capitalize,
    addQuotes: true,
  },
  {
    name: 'Capitalize All Words',
    transformation: capitalizeAll,
    addQuotes: true,
  },
  {
    name: 'snake_case',
    transformation: snakeCase,
    addQuotes: true,
  },
  {
    name: 'camelCase',
    transformation: camelCase,
    addQuotes: true,
  },
  {
    name: 'PascalCase',
    transformation: pascalCase,
    addQuotes: true,
  },
  {
    name: 'constant notation',
    transformation: tranformsLinesToConstants,
  },
  {
    name: 'constant notation in a map',
    transformation: (str: string) => tranformsLinesToConstants(str, ',', true),
  },
];

const InlineStyle = () => (
  <style>
    {`
    .section-wrapper {
      width: 100%;
    }
    .inputs-wrapper {
      margin-bottom: 1rem;
    }
    .textarea {
      height: 7rem;
    }
    .results-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding-top: 30px;
    }
    .ui.message.result {
      width: 30%;
      position: relative;
      margin: 0 3% 1rem 0;
      min-height: 6rem;
    }
    .ui.message.result:last-child {
      margin-top: 0;
      margin-bottom: 1rem;
    }
    .ui.message.result:nth-of-type(3) {
      margin-right: 0;
    }
    .ui.message.result:nth-of-type(3) {
      margin-right: 0;
    }
    .ui.message.result pre {
      white-space: pre-wrap;
      word-break: break-word;
    }
    .ui.message.result .copy {
      position: absolute;
      right: .7em;
      top: .7em;
      margin: 0;
      cursor: pointer;
      font-size: 1.2em;
    }
  `}
  </style>
);

const Text: SFC = () => {
  const [text, setText] = useState('');
  const [quotes, setQuotes] = useState(QUOTES_TYPES.NO_QUOTES);

  return (
    <Fragment>
      <InlineStyle />

      <div className="section-wrapper">
        <h2>Text transformations</h2>
        <Form className="inputs-wrapper">
          <Form.Field>
            <TextArea
              placeholder="Enter any text"
              className="textarea"
              onChange={e => setText(e.currentTarget.value)}
            />
          </Form.Field>
          <Form.Group inline>
            <label>Quotes type</label>
            <Form.Radio
              label='No quotes'
              value={QUOTES_TYPES.NO_QUOTES}
              checked={quotes === QUOTES_TYPES.NO_QUOTES}
              onChange={() => setQuotes(QUOTES_TYPES.NO_QUOTES)}
            />
            <Form.Radio
              label='Single quotes'
              value={QUOTES_TYPES.SINGLE}
              checked={quotes === QUOTES_TYPES.SINGLE}
              onChange={() => setQuotes(QUOTES_TYPES.SINGLE)}
            />
            <Form.Radio
              label='Double quotes'
              value={QUOTES_TYPES.DOUBLE}
              checked={quotes === QUOTES_TYPES.DOUBLE}
              onChange={() => setQuotes(QUOTES_TYPES.DOUBLE)}
            />
          </Form.Group>
        </Form>

        <div className="results-wrapper">
          {results.map(res => {
            const transformedText = res.transformation(text);
            const outputText = res.addQuotes ? addQuotesToLines(transformedText, quotes) : transformedText;

            return (
              <Message className="result" key={res.name}>
                <CopyToClipboard text={transformedText}>
                  <Icon name="copy outline" className="copy" />
                </CopyToClipboard>
                <Message.Header>{res.name}</Message.Header>
                {text && <pre>{outputText}</pre>}
              </Message>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Text;
