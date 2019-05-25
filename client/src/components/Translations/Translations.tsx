import React, { SFC, Fragment, useState } from 'react';
import { Form, TextArea, Select } from 'semantic-ui-react';

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
  return (
    <Fragment>
      <InlineStyle />

      <div className="section-wrapper">
        <h1>Translations</h1>
        <Form className="inputs-wrapper">
          {/* <Form.Field
            constrol={Select}
            options={OPTIONS}
            label="Language"
            selected="en"
            placeholder="Select Language"
            id="input-language"
            search
            searchInput={{ id: 'input-language' }}
          /> */}
           <Form.Field
            control={Select}
            options={OPTIONS}
            label={{ children: "Language", htmlFor: "input-language" }}
            placeholder="Select Language"
            defaultValue="en"
            search
            searchInput={{ id: "input-language" }}
          />
          <Form.Field>
            <label htmlFor="text-input">Text to translate</label>
            <TextArea
              placeholder="Welcome"
              className="textarea"
              data-testid="text-input"
              id="text-input"
            />
          </Form.Field>
        </Form>
      </div>
    </Fragment>
  )
}

export default Translations;
