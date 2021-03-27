import cheerio from 'cheerio';
import fetch from 'cross-fetch';


export function getHTMLPage(url: string): Promise<any> {
  return fetch(url)
    .then(res => {
      return res.text();
    })
    .then((html: string | { toString(): string; }) => cheerio.load(html));
}
