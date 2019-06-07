import axios from 'axios';

const BASE_URI = 'https://us-central1-dev-helpers.cloudfunctions.net';

export type ITranslationData = {
  strings: {
    named?: { [key:string]: string },
    unnamed?: string[],
  },
  langs: string[],
} | {};

export const translate = (data: ITranslationData) => axios.post(`${BASE_URI}/translateText`, data);
