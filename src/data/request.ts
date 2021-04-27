import cheerio from 'cheerio';
import fetch from 'cross-fetch';

import { IdNode } from './objects';


const BASE_URL = 'https://www.imdb.com/'


export function abstractCollectionCrawler<T extends IdNode>(
  url: string, numberOfReturnObjects: number, startElement: number, container_selector: string, TYPE: (new (data_$: any, element: any) => T)
): Promise<T[]> {
  return getHTMLPage(url).then(
    data_$ => {
      let result: T[] = [];

      const elements = data_$(container_selector);
      for (let i = startElement; i < numberOfReturnObjects && i < elements.length; i++) {
        const object = new TYPE(data_$, elements[i]);
        if (object.id != null) {
          result.push(object);
        }
      }

      return result;
    }
  );
}


export function abstractObjectCrawler<T>(url: string, TYPE: (new (data_$: any) => T)): Promise<T> {
  return getHTMLPage(url).then(data_$ => {
    return new TYPE(data_$);
  });
}


export function getHTMLPage(url: string): Promise<any> {
  return fetch(BASE_URL + url)
    .then(res => {
      return res.text();
    })
    .then((html: string | { toString(): string; }) => cheerio.load(html));
}
