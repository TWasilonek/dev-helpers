async function quickstart(
  projectId = 'dev-helpers',
) {
  const Translate = require('@google-cloud/translate');
  const translate = new Translate.Translate({projectId});

  async function makeTranslations (strings, target) {
    /*
      named:
      {
        'text.name': 'some text',
        'text.name': 'some text',
      },
      unnamed:
      [
        'some text',
        'some text'
      ]
    */
    const results = {
      named: {},
      unnamed: [],
    };
    
    if (strings.unnamed.length) {
      const [translation] = await translate.translate(strings.unnamed, target);
      results.unnamed = translation;
    }

    const values = Object.values(strings.named);
    const keys = Object.keys(strings.named);
    
    const [translation] = await translate.translate(values, target);
    results.named = keys.reduce((acc, key, i) => ({ ...acc, [key]: translation[i] }), {});
      
    return results;
  }

  const strings = {
    named: {
      'text.hello': 'Hello, world!',
      'text.other': 'another word',
    },
    unnamed: [
      'Hello world!',
      'another word',
    ]
  };

  const langs = ['ru', 'de', 'pl'];

  const translations = await Promise.all(langs.map(lang => makeTranslations(strings, lang)));
  const response = langs.reduce((acc, lang, i) => ({ ...acc, [lang]: translations[i] }), {});

  console.log('Text:' ,strings);
  console.log('Translation:', response);
};

module.exports = quickstart;

// Ex. reqests:
// {
//   "strings": {
//     "named": {
//       "text.hello": "Hello, world!",
//       "text.other": "another word"
//     },
//     "unnamed": [
//       "Hello world!",
//       "another word"
//     ]
//   },
//   "langs": ["ru", "de", "pl"]
// }

// {
//   "strings": {
//     "named": {},
//     "unnamed": [
//       "Hello world!",
//       "another word"
//     ]
//   },
//   "langs": ["ru", "de", "pl"]
// }

// {
//   "strings": {
//     "named": {
//       "text.hello": "Hello, world!",
//       "text.other": "another word"
//     },
//     "unnamed": []
//   },
//   "langs": ["ru", "de", "pl"]
// }
  