import { Trending } from './data/objects';
import { abstractCollectionCrawler } from './data/request';
import { trending_element_container_selector } from './data/selectors';
import { Watchable } from './data/types';


const URLs: { [key in Watchable]: string } = {
  [Watchable.TV]: 'chart/tvmeter',
  [Watchable.MOVIE]: 'chart/moviemeter'
}

export function getTrending(number = Number.MAX_SAFE_INTEGER, type = Watchable.MOVIE): Promise<Trending[]> {
  return abstractCollectionCrawler<Trending>(URLs[type], number, 0, trending_element_container_selector, Trending);
}
