import React, { SFC, Fragment, useState, useEffect } from 'react';
import { Form, TextArea, Select, Button } from 'semantic-ui-react';
import Result from '../Result/Result';
import translationApi, {
  TranslationData,
  GetLanguagesType
} from '../../api/translationApi';
import {
  transformLines,
  sanitizeSpaces
} from '../../utils/stringTransformations';

const InlineStyle = () => (
  <style>
    {`
    .section-wrapper {
      width: 100%;
      max-width: 1000px;
      padding-bottom: 60px;
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
    .lang-dropdown {
      width: 200px;
    }
    .lang-dropdown label {
      display: block;
      margin: 0 0 .28571429rem 0;
      color: rgba(0,0,0,.87);
      font-size: .92857143em;
      font-weight: 700;
      text-transform: none;
    }
    .target-lang-container {
      box-shadow: 0 0 0 1px rgba(154, 154, 165, 0.22) inset, 0 0 0 0 transparent;
      padding: 30px;
      margin: 30px 0;
    }
    .ui.message.result.translation-result {
      margin: 20px 0 0 0;
    }

    @media only screen and (max-width: 600px) {
      .target-lang-container {
        padding: 30px 0;
        box-shadow: none;
        margin: 0 20px 0 0;
        border-top: 1px solid rgba(154, 154, 165, 0.22);
      }
    }

    @media only screen and (max-width: 400px) {
      .lang-dropdown {
        width: 100%;
      }
      .lang-dropdown .dropdown {
        width: 100%;
      }
    }
  `}
  </style>
);

const mapOptions = (data: GetLanguagesType[]) =>
  data.map(el => ({
    text: el.name,
    value: el.code,
    key: el.code
  }));

interface EventData {
  name: string;
  value: string;
}
interface TranslationsState {
  [lang: string]: string[];
}

const Translations: SFC = () => {
  const placeholder = 'Bienvenido';
  const [sourceText, setSourceText] = useState('');
  const [translations, setTranslations] = useState<TranslationsState>({});
  const [targetLangs, setTargetLangs] = useState(['en']);
  const [langOptions, setlangOptions] = useState<GetLanguagesType[] | any[]>(
    []
  );
  useEffect(() => {
    async function geLanguagesList() {
      const response = await translationApi.getLanguages();
      const options = response ? mapOptions(response.data) : [];
      setlangOptions(options);
    }
    geLanguagesList();
  }, []);

  const postTranslations = async (data: TranslationData) => {
    const result = await translationApi.translate(data);
    setTranslations({ ...result.data });
  };

  const handleSubmit = () => {
    const strings = transformLines(sanitizeSpaces, sourceText);
    const data: TranslationData = {
      strings: [strings],
      langs: [...targetLangs]
    };
    postTranslations(data);
  };

  const handleSourceTextChange = (e: Event, { name, value }: EventData) => {
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
  };

  const handleAddTargeLang = () => {
    setTargetLangs([...targetLangs, 'en']);
  };

  const renderLangDropdown = ({
    id,
    label,
    placeholder,
    defaultValue,
    testId,
    ...otherProps
  }: {
    id: string;
    label: string;
    placeholder: string;
    defaultValue: string;
    testId?: string;
    onChange?: Function;
  }) => (
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
      className="lang-dropdown"
    />
  );

  const renderTargetLang = (lang: string, i: number) => {
    const translationText = translations[lang]
      ? translations[lang].join('\n')
      : '';
    return (
      <div data-testid="target-lang" key={i} className="target-lang-container">
        {renderLangDropdown({
          id: 'target-language',
          label: 'Target Language',
          placeholder: 'Select language',
          defaultValue: lang,
          onChange: (e: Event, data: EventData) =>
            hadleTargateLangChange(data, i),
          testId: `target-language-${lang}`
        })}
        <Result
          className="translation-result"
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
          <Form.Field
            control={TextArea}
            label="Text to translate"
            placeholder="Welcome"
            className="textarea"
            data-testid="source-text"
            id="source-text"
            onChange={handleSourceTextChange}
          />
          <Form.Button
            content="Translate"
            type="submit"
            primary
            disabled={sourceText.length < 1}
            data-testid="submit"
          />
        </Form>

        {targetLangs.map(renderTargetLang)}

        <Button content="Add target language" onClick={handleAddTargeLang} />
      </div>
    </Fragment>
  );
};

export default Translations;
