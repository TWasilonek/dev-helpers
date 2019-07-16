import React, { SFC, Fragment, useState, useEffect, useRef } from 'react';
import { Form, TextArea, Select, FormFieldProps } from 'semantic-ui-react';
import Result from '../Result/Result';
import translationApi, { TranslationData, GetLanguagesType } from '../../api/translationApi';
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

const mapOptions = (data: GetLanguagesType[]) => data.map(el => ({
  text: el.name,
  value: el.code,
  key:  el.code,
}));

const Translations: SFC = () => {
  const placeholder = 'Bienvenido';
  const [sourceText, setSourceText] = useState('');
  const [translation, setTranslation] = useState('');
  const [sourceLang, setSourceLang] = useState('');
  const [targetLangs, setTargetLangs] = useState(['en']);

  const [langOptions, setlangOptions] = useState<GetLanguagesType[] | any[]>([]);
  useEffect(() => {
    async function getSourceLanguagesList() {
      const response = await translationApi.getLanguages();
      const options = response ? mapOptions(response.data) : [];
      setlangOptions(options);
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

  const postTranslations = async (data: TranslationData) => {
    const result = await translationApi.translate(data);
    // TODO: iterate through result.data adn assign translations to languages
    // const translatedText = result.data[targetLang];
    // setTranslation(translatedText);
  }

  const handleSubmit = () => {
    const strings = transformLines(sanitizeSpaces, sourceText);
    const data: TranslationData = {
      strings: [strings],
      langs: [...targetLangs],
    };
    postTranslations(data);
  };

  const handleChange = (
    e: Event,
    { name, value }: { name: string; value: string }
  ) => {
    setSourceText(value);
  };

  const hadleTargateLangChange = (
    e: Event,
    { name, value }: { name: string; value: string },
    index: number
  ) => {
    // TODO: targetLangs will be better as key=value pairs ? key = index?
    const newLangs = targetLangs.map((lang: string, i: number) => {
      if (index === i) {
        return value;
      }
      return lang;
    });
    setTargetLangs(newLangs);
  }

  const handleAddTargeLang = () => {
    setTargetLangs([...targetLangs, 'en']); 
  }

  const renderLangDropdown = (
    { id, label, placeholder, defaultValue, testId, ...otherProps } : { 
      id: string, label: string, placeholder: string, defaultValue: string, testId?: string, onChange?: Function,
    }
  ) => (
    <Form.Field
      {...otherProps}
      loading={!langOptions.length}
      control={Select}
      options={langOptions}
      label={{ children: label, htmlFor: id }}
      placeholder={placeholder}
      defaultValue={defaultValue}
      search
      searchInput={{ id }}
      data-testid={testId}
    />
  );

  const renderTargetLang = (lang: string) => (
    <div data-testid="target-lang">
      {renderLangDropdown({
        id: 'target-language',
        label: 'Target Language',
        placeholder: 'Select language',
        defaultValue: lang,
        onChange: hadleTargateLangChange,
        testId: 'target-language'
      })}
      <Result
        className="text-result"
        clipboardText={translation}
        text={translation}
        placeholder={placeholder}
        header="Translation"
      />
    </div>
  );


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
          {renderLangDropdown({
            id: 'source-language',
            label: 'Source Language',
            placeholder: 'Select language',
            defaultValue: 'en',
            testId: 'source-language'
          })}
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
            Translate
          </Form.Button>
        </Form>

        {targetLangs.map(renderTargetLang)}

        <button type="button" onClick={handleAddTargeLang}>
          Add target language
        </button>
      </div>
    </Fragment>
  );
};

export default Translations;
