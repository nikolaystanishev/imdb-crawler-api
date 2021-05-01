import { IdNode } from './data/objects';
import { abstractCollectionCrawler } from './data/request';
import {
  search_actor_id,
  search_actor_image,
  search_actor_name,
  search_watchable_id,
  search_watchable_name,
  search_watchable_poster,
  search_watchable_year_type
} from './data/selectors';


export function getSearchWatchable(searchQuery: string): Promise<SearchWatchable[]> {
  return abstractCollectionCrawler<SearchWatchable>(
    `find?q=${encodeURIComponent(searchQuery)}&s=tt&exact=true&ref_=fn_al_tt_ex`, Number.MAX_SAFE_INTEGER, 0, 'tr.findResult',
    SearchWatchable
  );
}


export function getSearchActor(searchQuery: string): Promise<SearchActor[]> {
  return abstractCollectionCrawler<SearchActor>(
    `find?ref_=nv_sr_fn&q=${encodeURIComponent(searchQuery)}&s=nm`, Number.MAX_SAFE_INTEGER, 0, 'tr', SearchActor
  );
}


export class SearchWatchable extends IdNode {
  name: string;
  poster: string;
  year: string | undefined;
  type: string | undefined;
  part: string | undefined;

  constructor(data_$: any, element: any) {
    super(data_$(element).find(search_watchable_id)[0].attribs.href.split('/')[2]);

    this.name = data_$(element).find(search_watchable_name).text();
    const posterAttribs = data_$(element).find(search_watchable_poster)[0].attribs;
    this.poster = posterAttribs.loadlate ?
      posterAttribs.loadlate.split('@._')[0] + '@._V1_QL50.jpg' :
      posterAttribs.src.split('@._')[0] + '@._V1_QL50.jpg';
    let yearType: string[] =
      data_$(data_$(element).find(search_watchable_year_type).children()[0].next).text().trim().split(') (');
    this.type = yearType.pop()?.replace('(', '').replace(')', '').trim();
    this.year = yearType.pop()?.replace('(', '').replace(')', '').trim();
    if (yearType.length == 1) {
      this.part = yearType.pop()?.replace('(', '').replace(')', '').trim();
    }
  }
}


export class SearchActor extends IdNode {
  name: string;
  poster: string;

  constructor(data_$: any, element: any) {
    super(data_$(element).find(search_actor_id).attr('href').split('/')[2]);

    this.name = data_$(element).find(search_actor_name).text().trim();
    this.poster = data_$(element)
      .find(search_actor_image).attr('src').replace('\'', '').replace(/\\g/, '')
      .split('@._')[0] + '@._V1_UX1024_CR1024,1024,0,0_AL_.jpg';
  }
}
