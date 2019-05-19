async function quickstart(
  projectId = 'dev-helpers',
) {
  const Translate = require('@google-cloud/translate');
  const translate = new Translate.Translate({projectId});

  async function makeTranslations (inputs, target) {
    /*
      Example text:
      {
        'text.name' = 'some text',
        'text.name' = 'some text',
      }
  
      or:
  
      [
        'some text',
        'some text'
      ]
    */
      let results;

      if (Array.isArray(inputs, target)) {
        const [translation] = await translate.translate(inputs, target);
        results = translation;
      } else {
        const values = Object.values(inputs);
        const keys = Object.keys(inputs);
        
        const [translation] = await translate.translate(values, target);
        results = keys.reduce((acc, key, i) => ({ ...acc, [key]: translation[i] }), {});
      }
  
      return results;
  }

  // const strings = {
  //   'text.hello': 'Hello, world!',
  //   'text.other': 'another word',
  // };
  const strings = [
    'Hello world!',
    'another word',
  ];

  const langs = ['ru', 'de', 'pl'];

  const translations = await Promise.all(langs.map(lang => makeTranslations(strings, lang)));
  const response = langs.reduce((acc, lang, i) => ({ ...acc, [lang]: translations[i] }), {});

  console.log('Text:' ,strings);
  console.log('Translation:', response);
};

module.exports = quickstart;