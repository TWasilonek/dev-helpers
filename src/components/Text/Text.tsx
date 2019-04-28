import React, { SFC, Fragment, useState } from 'react';
import { Form, TextArea, Message } from 'semantic-ui-react';
import { toUpperCase, toLowerCase, capitalize, capitalizeAll, snakeCase } from '../../utils/stringTransformations';

const results = [
  {
    name: 'Uppercase',
    transformation: toUpperCase
  },
  {
    name: 'Lowercase',
    transformation: toLowerCase,
  },
  {
    name: 'Capitalize first word',
    transformation: capitalize,
  },
  {
    name: 'Capitalize all',
    transformation: capitalizeAll,
  },
  {
    name: 'Snake case',
    transformation: snakeCase,
  },
];

const InlineStyle = () => (
  <style>{`
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
      margin: 0 3% 1rem 0;
      min-height: 9rem;
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
      white-space: normal;
      word-break: break-word;
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
              <Message.Header>{res.name}</Message.Header>
                {transformedText && (
                  <Fragment>
                     <pre>
                      {transformedText}
                    </pre>
                    <pre>
                      {`'${transformedText}'`}
                    </pre>
                  </Fragment>
                )}
              </Message>
            );
          })}
        </div>
      </div>
    </Fragment>
  )
};

export default Text;
