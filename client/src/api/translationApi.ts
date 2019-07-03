import axios from 'axios';

const BASE_URI = 'https://us-central1-dev-helpers.cloudfunctions.net';

export type ITranslationData =
  | {
      strings: {
        named?: { [key: string]: string };
        unnamed?: string[];
      };
      langs: string[];
    }
  | {};

const translate = (data: ITranslationData) =>
  axios.post(`${BASE_URI}/translateText`, data);

const translationApi = {
  translate: translate,
};

export default translationApi;
