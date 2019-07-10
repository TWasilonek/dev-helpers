import React, { SFC, Fragment, useState, useEffect, useRef } from 'react';
import { Form, TextArea, Select } from 'semantic-ui-react';
import Result from '../Result/Result';
import translationApi, { ITranslationData } from '../../api/translationApi';
import { transformLines, sanitizeSpaces } from '../../utils/stringTransformations';
import { AxiosResponse } from 'axios';

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
  const placeholder = 'Bienvenido';
  const [sourceText, setSourceText] = useState('');
  const [translation, setTranslation] = useState('');
  const [sourceLang, setSourceLang] = useState('');

  const [sourceLangOptions, setSourceLangOptions] = useState<AxiosResponse | any[]>([]);
  useEffect(() => {
    async function getSourceLanguagesList() {
      const response = await translationApi.getLanguages();
      setSourceLangOptions(response);
    }
    getSourceLanguagesList();
  }, []);

  // useEffect(() => {
  //   async function postTranslations() {
  //     const result = await translationApi.translate(data);
  //     const translatedText = result.data['es'];
  //     setTranslation(translatedText);
  //   }

  //   // don't run on start
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }

  //   postTranslations();
  // }, [data]); // this effect will run only when 'data' changes

  const postTranslations = async (data: ITranslationData) => {
    const result = await translationApi.translate(data);
    const translatedText = result.data['es'];
    setTranslation(translatedText);
  }

  const handleSubmit = () => {
    const strings = transformLines(sanitizeSpaces, sourceText);
    const data: ITranslationData = {
      strings: [strings],
      langs: ['es'],
    };
    postTranslations(data);
  };

  const handleChange = (
    e: Event,
    { name, value }: { name: string; value: string }
  ) => {
    setSourceText(value);
  };

  return (
    <Fragment>
      <InlineStyle />

      <div className="section-wrapper">
        <h1>Translations</h1>
        <Form
          className="inputs-wrapper"
          data-testid="translation-form"
          onSubmit={handleSubmit}
        >
          <Form.Field
            control={Select}
            options={OPTIONS}
            label={{ children: 'Language', htmlFor: 'input-language' }}
            placeholder="Select Language"
            defaultValue="en"
            search
            searchInput={{ id: 'input-language' }}
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
          <Form.Button type="submit" data-testid="submit">
            Submit
          </Form.Button>
        </Form>

        <Result
          className="text-result"
          clipboardText={translation}
          text={translation}
          placeholder={placeholder}
          header="Translation"
        />
      </div>
    </Fragment>
  );
};

export default Translations;
