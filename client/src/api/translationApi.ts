import axios from 'axios';

const BASE_URI = 'https://europe-west1-dev-helpers.cloudfunctions.net';

export type TranslationData =
  | {
      strings: string[];
      langs: string[];
    }
  | {};

export interface GetLanguagesType {
  name: string;
  code: string;
}

const translate = (data: TranslationData) =>
  axios.post(`${BASE_URI}/translateText`, data);

const getLanguages = () =>
  axios.get<GetLanguagesType[]>(`${BASE_URI}/getLanguages`);

const translationApi = {
  translate: translate,
  getLanguages: getLanguages
};

export default translationApi;
