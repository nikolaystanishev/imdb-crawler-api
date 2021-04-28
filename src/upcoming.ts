import { IdNode } from './data/objects';
import { Parsers } from './data/parsers';
import { abstractCollectionCrawler } from './data/request';
import { upcoming_all_selector } from './data/selectors';


export function getUpcoming(number = Number.MAX_SAFE_INTEGER, region: string = ''): Promise<Upcoming[]> {
  const url = `calendar/?ref_=nv_mv_cal${region != '' ? `&region=${region}` : ''}`;

  return abstractCollectionCrawler<Upcoming>(url, number, 0, upcoming_all_selector, Upcoming);
}


export class Upcoming extends IdNode {
  name: string;
  releaseDate: string;
  year: string;

  constructor(data_$: any, movie: any) {
    const id = data_$(movie).children('a').attr('href').split('/')[2];
    super(id);

    this.name = data_$(movie).children('a').text();
    this.releaseDate = data_$(movie).parent('ul').prev('h4').text();
    this.year = Parsers.parseYear(data_$(movie).text().trim().slice(-6, -1));
  }
}
