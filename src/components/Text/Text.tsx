import React, { SFC, Fragment, useState } from 'react';
import { Form, TextArea, Message, Divider } from 'semantic-ui-react';

function toUpperCase(value: string) {
  return `${value.toUpperCase()}\n'${value.toUpperCase()}'`
}

function toLowerCase(value: string) {
  return `${value.toLowerCase()}\n'${value.toLowerCase()}'`
}

function capitalize(value: string) {
  const capitalized = value.substr(0, 1).toUpperCase() + value.substr(1);
  return `${capitalized}\n'${capitalized}'`
}

function capitalizeAll(value: string) {
  const words = value.split(' ');
  const capitalized = words.map(word => capitalize(word)).join(' ');
  console.log(capitalized);
  return `${capitalized}\n'${capitalized}'`
}


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
]

const InlineStyle = () => (
  <style>{`
    .section-wrapper {
      width: 100%;
    }
    .inputs-wrapper {
      margin-bottom: 30px;
    }
    .textarea {
      height: 180px;
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
    }
    .ui.message.result:last-child {
      margin-top: 0;
      margin-bottom: 1rem;
    }
    .ui.message.result:nth-of-type(3) {
      margin-right: 0;
    }
  `}
  </style>
)

const Text: SFC = () => {
  const [text, setText] = useState('');
  return (
    <Fragment>
      <InlineStyle />

      <div className="section-wrapper">
        <h2>Text transforms</h2>
        <Form className="inputs-wrapper">
          <Form.Field>
            <TextArea
              placeholder="Enter any text"
              className="textarea"
              onChange={e => setText(e.currentTarget.value)}
            />
          </Form.Field>
        </Form>

        <Divider />
        
        <div className="results-wrapper">
          {results.map(res => (
            <Message className="result" key={res.name}>
             <Message.Header>{res.name}</Message.Header>
             <pre>
               <code>
                 {res.transformation(text)}
               </code>
             </pre>
            </Message>
          ))}
        </div>
      </div>
    </Fragment>
  )
};

export default Text;
