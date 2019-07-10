import axios from 'axios';

const BASE_URI = 'https://europe-west1-dev-helpers.cloudfunctions.net';

export type ITranslationData = {
  strings: string[];
  langs: string[];
} | {};

const translate = (data: ITranslationData) => axios.post(`${BASE_URI}/translateText`, data);

const getLanguages = () => axios.get<any[]>(`${BASE_URI}/getLanguages`);

const translationApi = {
  translate: translate,
  getLanguages: getLanguages,
};

export default translationApi;
