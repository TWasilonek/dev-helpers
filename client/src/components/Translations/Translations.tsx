import React, { SFC, Fragment, useState, useEffect, useRef } from 'react';
import { Form, TextArea, Select, FormFieldProps } from 'semantic-ui-react';
import Result from '../Result/Result';
import translationApi, { TranslationData, GetLanguagesType } from '../../api/translationApi';
import { transformLines, sanitizeSpaces } from '../../utils/stringTransformations';

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

type EventData = { name: string; value: string };
interface TranslationsState { [lang: string]: string[] };

const Translations: SFC = () => {
  const placeholder = 'Bienvenido';
  const [sourceText, setSourceText] = useState('');
  const [translations, setTranslations] = useState<TranslationsState>({});
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

  const postTranslations = async (data: TranslationData) => {
    const result = await translationApi.translate(data);
    setTranslations({ ...result.data });
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
    { name, value }: EventData
  ) => {
    setSourceText(value);
  };

  const hadleTargateLangChange = (
    { name, value }: EventData,
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

  const renderTargetLang = (lang: string, i: number) => {
    const translationText = translations[lang] ? translations[lang].join('\n') : '';
    // TODO: outputTestId={`result-output-${lang}`} lang = 'en' all the times
    console.log('lang passed', lang);
    return (
      <div data-testid="target-lang">
        {renderLangDropdown({
          id: 'target-language',
          label: 'Target Language',
          placeholder: 'Select language',
          defaultValue: lang,
          onChange: (e: Event, data: EventData) => hadleTargateLangChange(data, i),
          testId: `target-language-${lang}`
        })}
        <Result
          className="text-result"
          clipboardText={translationText}
          text={translationText}
          placeholder={placeholder}
          header="Translation"
          outputTestId={`result-output-${lang}`}
        />
      </div>
    );
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
