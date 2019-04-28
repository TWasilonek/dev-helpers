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
} from '../../utils/stringTransformations';

const results = [
  {
    name: 'UPPERCASE',
    transformation: toUpperCase,
  },
  {
    name: 'lowercase',
    transformation: toLowerCase,
  },
  {
    name: 'Capitalize first word',
    transformation: capitalize,
  },
  {
    name: 'Capitalize All Words',
    transformation: capitalizeAll,
  },
  {
    name: 'snake_case',
    transformation: snakeCase,
  },
  {
    name: 'camelCase',
    transformation: camelCase,
  },
  {
    name: 'PascalCase',
    transformation: pascalCase,
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
        </Form>

        <div className="results-wrapper">
          {results.map(res => {
            const transformedText = res.transformation(text);
            return (
              <Message className="result" key={res.name}>
                <CopyToClipboard text={transformedText}>
                  <Icon name="copy outline" className="copy" />
                </CopyToClipboard>
                <Message.Header>{res.name}</Message.Header>
                {text && <pre>{transformedText}</pre>}
              </Message>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Text;
