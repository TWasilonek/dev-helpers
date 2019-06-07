import React, { SFC, Fragment, useState, useEffect } from 'react';
import { Form, TextArea, Select } from 'semantic-ui-react';
import Result from '../Result/Result';
import { translate, ITranslationData } from '../../api/translationApi';

const OPTIONS = [
  {
    text: 'English',
    value: 'en',
    key: 'en',
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
  `}
  </style>
);

const Translations: SFC = () => {
  const [text, setText] = useState('Bienvenido');

  const [data, setData] = useState({});
  useEffect(() => {
    async function postTranslations() {
      const result = await translate(data);
      console.log('result');
    }
    postTranslations();
  });

  const onSubmit = () => {
    const data: ITranslationData = {
      strings: {
        named: {},
        unnamed: [],
      },
      langs: [],
    }

    setData(data);
  }

  return (
    <Fragment>
      <InlineStyle />

      <div className="section-wrapper">
        <h1>Translations</h1>
        <Form className="inputs-wrapper" data-testid="translation-form" onSubmit={onSubmit}>
           <Form.Field
            control={Select}
            options={OPTIONS}
            label={{ children: "Language", htmlFor: "input-language" }}
            placeholder="Select Language"
            defaultValue="en"
            search
            searchInput={{ id: "input-language" }}
          />
          <Form.Field
            control={TextArea}
            label="Text to translate"
            placeholder="Welcome"
            className="textarea"
            data-testid="text-input"
            id="text-input"
          />
          <Form.Button type='submit' data-testid="submit">
            Submit
          </Form.Button>
        </Form>
        
        <Result
          className="text-result"
          clipboardText={text}
          text={text}
          header="Translation"
        />
      </div>
    </Fragment>
  )
}

export default Translations;
