import { IdNode } from './data/objects';
import { Parsers } from './data/parsers';
import { abstractCollectionCrawler } from './data/request';
import { Watchable } from './data/types';
import {
  trending_element_container_selector,
  trending_id_selector,
  trending_name_selector,
  trending_poster_selector,
  trending_rating_selector,
  trending_year_selector
} from './data/selectors';


const URLs: { [key in Watchable]: string } = {
  [Watchable.TV]: 'chart/tvmeter',
  [Watchable.MOVIE]: 'chart/moviemeter'
}

export function getTrending(number = Number.MAX_SAFE_INTEGER, type = Watchable.MOVIE): Promise<Trending[]> {
  return abstractCollectionCrawler<Trending>(URLs[type], number, 0, trending_element_container_selector, Trending);
}


export class Trending extends IdNode {
  name: string;
  poster: string;
  year: string;
  rating: string;

  constructor(data_$: any, watchable: any) {
    const id = data_$(watchable).find(trending_id_selector)[0].attribs.href.split('/')[2];
    super(id);

    this.name = data_$(watchable).find(trending_name_selector).text();
    this.poster = Parsers.parsePoster(data_$(watchable).find(trending_poster_selector));
    this.year = Parsers.parseYear(data_$(watchable).find(trending_year_selector).text());
    this.rating = data_$(watchable).find(trending_rating_selector).text();
  }
}
