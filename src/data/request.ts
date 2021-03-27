import cheerio from 'cheerio';
import fetch from 'cross-fetch';


const BASE_URL = 'https://www.imdb.com/'

export function abstractCollectionCrawler<T>(
  url: string, numberOfReturnObjects: number, container_selector: string, TYPE: (new (data_$: any, movie: any) => T)
): Promise<T[]> {
  return getHTMLPage(url).then(
    data_$ => {
      let upcoming: T[] = [];

      const movies = data_$(container_selector);
      for (let i = 0; i < numberOfReturnObjects && i < movies.length; i++) {
        upcoming.push(new TYPE(data_$, movies[i]));
      }

      return upcoming;
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
