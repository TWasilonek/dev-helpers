/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const Translate = require('@google-cloud/translate');
const translate = new Translate.Translate();

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

exports.translateText = async (req, res) => {
  const { langs, strings } = req.body;

  const translations = await Promise.all(langs.map(lang => makeTranslations(strings, lang)));
  const response = langs.reduce((acc, lang, i) => ({ ...acc, [lang]: translations[i] }), {});

  res.status(200).send(response);
};
