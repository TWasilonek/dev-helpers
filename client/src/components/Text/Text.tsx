import React, { SFC, Fragment, useState } from 'react';
import { Form, TextArea, Message, Icon } from 'semantic-ui-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';

import {
  toUpperCase,
  toLowerCase,
  capitalize,
  capitalizeAll,
  snakeCase,
  camelCase,
  pascalCase,
  addQuotes,
  transformLines,
  createConstant,
} from '../../utils/stringTransformations';
import { QUOTES_TYPES, PLACEHOLDER_TEXT } from '../../constants';

export interface ITransformation {
  name: string,
  transformation: Function,
  addQuotes: boolean
}

interface Props {
  transformations: ITransformation[],
 }

const TRANSFORMATIONS = [
  {
    name: 'UPPERCASE',
    transformation: (str: string) => transformLines(toUpperCase, str),
    addQuotes: true,
  },
  {
    name: 'lowercase',
    transformation: (str: string) => transformLines(toLowerCase, str),
    addQuotes: true,
  },
  {
    name: 'Capitalize first word',
    transformation: (str: string) => transformLines(capitalize, str),
    addQuotes: true,
  },
  {
    name: 'Capitalize All Words',
    transformation: (str: string) => transformLines(capitalizeAll, str),
    addQuotes: true,
  },
  {
    name: 'snake_case',
    transformation: (str: string) => transformLines(snakeCase, str),
    addQuotes: true,
  },
  {
    name: 'camelCase',
    transformation: (str: string) => transformLines(camelCase, str),
    addQuotes: true,
  },
  {
    name: 'PascalCase',
    transformation: (str: string) => transformLines(pascalCase, str),
    addQuotes: true,
  },
  {
    name: 'constant notation',
    transformation: (str: string) => transformLines(createConstant, str),
    addQuotes: false,
  },
  {
    name: 'constant notation in a map',
    transformation: (str: string) => transformLines(createConstant, str, ',', true),
    addQuotes: false,
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
    .ui.message.result pre {
      white-space: pre-wrap;
      word-break: break-word;
    }
    .ui.message.result pre.placeholder {
      color: #c5c5c5;
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

const Text: SFC<Props> = ({ transformations = TRANSFORMATIONS }) => {
  const [text, setText] = useState('');
  const [quotes, setQuotes] = useState(QUOTES_TYPES.NO_QUOTES);

  function transformText(text: string, transformation: Function, shouldAddQuotes: boolean | undefined): string {
    const transformedText = transformation(text);
    return shouldAddQuotes ? transformLines(addQuotes, transformedText, quotes) : transformedText;
  }

  return (
    <Fragment>
      <InlineStyle />

      <div className="section-wrapper">
        <h1>Text transformations</h1>
        <Form className="inputs-wrapper">
          <Form.Field>
            <label htmlFor="text-input">Text to transform</label>
            <TextArea
              placeholder={PLACEHOLDER_TEXT}
              className="textarea"
              onChange={e => setText(e.currentTarget.value)}
              data-testid="text-input"
              id="text-input"
            />
          </Form.Field>
          <Form.Group inline data-testid="quotes-input">
            <label>Quotes type</label>
            <Form.Radio
              label='No quotes'
              id="no-quotes"
              name="quotes"
              value={QUOTES_TYPES.NO_QUOTES}
              checked={quotes === QUOTES_TYPES.NO_QUOTES}
              onChange={() => setQuotes(QUOTES_TYPES.NO_QUOTES)}
            />
            <Form.Radio
              label='Single quotes'
              id="single-quotes"
              name="quotes"
              value={QUOTES_TYPES.SINGLE}
              checked={quotes === QUOTES_TYPES.SINGLE}
              onChange={() => setQuotes(QUOTES_TYPES.SINGLE)}
            />
            <Form.Radio
              label='Double quotes'
              id="double-quotes"
              name="quotes"
              value={QUOTES_TYPES.DOUBLE}
              checked={quotes === QUOTES_TYPES.DOUBLE}
              onChange={() => setQuotes(QUOTES_TYPES.DOUBLE)}
            />
          </Form.Group>
        </Form>

        <div className="results-wrapper">
          {transformations.map((res: ITransformation) => {
            const baseText = text || PLACEHOLDER_TEXT;
            const outputText = transformText(baseText, res.transformation, res.addQuotes);

            return (
              <Message className="result" key={res.name} data-testid="result">
                <CopyToClipboard text={(text ? outputText : '')}>
                  <Icon name="copy outline" className="copy" />
                </CopyToClipboard>
                <Message.Header data-testid="result-header">{res.name}</Message.Header>
                {<pre data-testid="result-output" className={classNames({ 'placeholder': !text })}>{outputText}</pre>}
              </Message>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Text;
