import cheerio from 'cheerio';
import fetch from 'cross-fetch';

import { IdNode } from './objects';


const BASE_URL = 'https://www.imdb.com/'
const BASE_REST_URL = 'https://v2.sg.media-imdb.com/'


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


export function abstractCollectionREST<T extends IdNode>(
  url: string, container_selector: string, TYPE: (new (data: any) => T)
): Promise<T[]> {
  return getRESTResponse(url).then(
    data => {
      let result: T[] = [];

      for (const searchResult in data[container_selector]) {
        result.push(new TYPE(searchResult));
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
    .then((html: string) => cheerio.load(html));
}


export function getRESTResponse(url: string): Promise<any> {
  return fetch(BASE_REST_URL + url)
    .then(res => {
      return res.text();
    })
    .then(data => {
      return JSON.parse(data.slice(data.indexOf('('), -1));
    });
}
