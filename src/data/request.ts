import request from 'request-promise-native';
import cheerio from 'cheerio';

import { from } from 'rxjs';


export function getHTMLObservable(url: string) {
  const options = {
    uri: url,
    transform: (html: string | { toString(): string; }) => cheerio.load(html)
  }

  return from(request(options).promise());
}
