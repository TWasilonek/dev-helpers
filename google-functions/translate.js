/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const Translate = require('@google-cloud/translate');
const translate = new Translate.Translate();

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

exports.translateText = async (req, res) => {
  const { langs, strings } = req.body;

  const translations = await Promise.all(langs.map(lang => makeTranslations(strings, lang)));
  const response = langs.reduce((acc, lang, i) => ({ ...acc, [lang]: translations[i] }), {});

  res.status(200).send(response);
};
