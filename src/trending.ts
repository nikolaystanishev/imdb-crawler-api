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

      const watchables = data_$(trending_element_container_selector);
      for (let i = 0; i < number && i < watchables.length; i++) {
        trending.push(new Trending(data_$, watchables[i]));
      }

      return trending;
    })
  );
}
