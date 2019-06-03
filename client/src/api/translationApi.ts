import axios from 'axios';

const BASE_URI = 'https://us-central1-dev-helpers.cloudfunctions.net';

export const translate = (data: TranslationData) => axios.post(`${BASE_URI}/translateText`, data);
