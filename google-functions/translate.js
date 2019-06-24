/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const Translate = require('@google-cloud/translate');
const translate = new Translate.Translate();

async function makeTranslations (strings, targetLang) {
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
    const [translation] = await translate.translate(strings.unnamed, targetLang);
    results.unnamed = translation;
  }

  const values = Object.values(strings.named);
  const keys = Object.keys(strings.named);
  if (values.length) {
    const [translation] = await translate.translate(values, targetLang);
    results.named = keys.reduce((acc, key, i) => ({ ...acc, [key]: translation[i] }), {});
  }
    
  return results;
}

exports.translateText = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    const { langs, strings } = req.body;
    console.log("langs", langs);
    console.log("strings", strings);

    if (!langs || !langs.length) {
      res.status(500).send('Missing "langs"');
    }

    if (!strings) {
      res.status(500).send('Missing "strings"');
    }

    try {
      const translations = await Promise.all(langs.map(lang => makeTranslations(strings, lang)));
      console.log('translations', translations);
      const response = langs.reduce((acc, lang, i) => ({ ...acc, [lang]: translations[i] }), {});
      console.log('response', response);
      res.status(200).send(response);
    } catch(e){
      console.error(e);
      res.status(500).send('Something went wrong');
    }
  }
};
