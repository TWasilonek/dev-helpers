/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const isoLangs = require('./languageCodes.js');
const Translate = require('@google-cloud/translate');
const translate = new Translate.Translate();

exports.getLanguages = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    try {
      const [languages] = await translate.getLanguages();
      const data = languages.map(lang => isoLangs.find(l => l.code === lang.code) || lang);
      res.status(200).send(data);
    } catch(e){
      console.error(e);
      res.status(500).send(e);
    }
  }
};
