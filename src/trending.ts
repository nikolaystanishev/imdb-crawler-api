import { Trending } from './data/objects';
import { getHTMLPage } from './data/request';
import { trending_element_container_selector } from './data/selectors';
import { Watchable } from './data/types';


const URLs: { [key in Watchable]: string } = {
  [Watchable.TV]: 'https://www.imdb.com/chart/tvmeter',
  [Watchable.MOVIE]: 'https://www.imdb.com/chart/moviemeter'
}

export function getTrending(number = Number.MAX_SAFE_INTEGER, type = Watchable.MOVIE): Promise<Trending[]> {
  return getHTMLPage(URLs[type]).then(
    (data_$: any) => {
      let trending: Trending[] = [];

      const watchables = data_$(trending_element_container_selector);
      for (let i = 0; i < number && i < watchables.length; i++) {
        trending.push(new Trending(data_$, watchables[i]));
      }

      return trending;
    }
  );
}
