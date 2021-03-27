
import request from 'request-promise-native';
import cheerio from 'cheerio';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Trending } from './data/objects';


const URLs: { [key: string]: string } = {
  tv: "https://www.imdb.com/chart/tvmeter",
  movie: "https://www.imdb.com/chart/moviemeter"
}


export function getTrending(number = 50, type = "movie"): Observable<Trending[]> {
  const options = {
    uri: URLs[type],
    transform: (html: string | { toString(): string; }) => cheerio.load(html)
  }

  return from(request(options).promise()).pipe(
    map((data_$) => {
      let trending: Trending[] = [];

      for (let i = 1; i <= number; i++) {
        trending.push(new Trending(data_$, i));
      }

      return trending;
    })
  );
}
