import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Trending } from './data/objects';
import { getHTMLObservable } from './data/request';
import { trending_element_container_selector } from './data/selectors';
import { Watchable } from './data/types';


const URLs: { [key in Watchable]: string } = {
  [Watchable.TV]: 'https://www.imdb.com/chart/tvmeter',
  [Watchable.MOVIE]: 'https://www.imdb.com/chart/moviemeter'
}

export function getTrending(number = Number.MAX_SAFE_INTEGER, type = Watchable.MOVIE): Observable<Trending[]> {
  return getHTMLObservable(URLs[type]).pipe(
    map((data_$: any) => {
      let trending: Trending[] = [];

      const allElementsCount = data_$(trending_element_container_selector).length;
      for (let i = 1; i <= number && i <= allElementsCount; i++) {
        trending.push(new Trending(data_$, i));
      }

      return trending;
    })
  );
}
