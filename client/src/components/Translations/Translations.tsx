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


const defaultData: ITranslationData = {
  strings: {
    named: {},
    unnamed: [],
  },
  langs: ['en'],
}

const Translations: SFC = () => {
  const [sourceText, setSourceText] = useState();
  const [translation, setTranslation] = useState('Bienvenido');

  const [data, setData] = useState(defaultData);
  useEffect(() => {
    // TODO: this is executed on every keystroke to text input. Fix it!
    async function postTranslations() {
      const result = await translate(data);
      console.log('result', result);
    }
    postTranslations();
  });

  const onSubmit = (formData: any) => {
    console.log('submit');
    const data: ITranslationData = {
      strings: {
        named: {},
        unnamed: [],
      },
      langs: ['en'],
    }

    setData(data);
  }

  const handleChange = (e: Event, { name, value }: { name: string, value: string }) => {
    setSourceText(value);
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
            data-testid="source-text"
            id="source-text"
            onChange={handleChange}
          />
          <Form.Button type='submit' data-testid="submit">
            Submit
          </Form.Button>
        </Form>
        
        <Result
          className="text-result"
          clipboardText={translation}
          text={translation}
          header="Translation"
        />
      </div>
    </Fragment>
  )
}

export default Translations;
