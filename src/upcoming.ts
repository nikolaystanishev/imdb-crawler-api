import { Upcoming } from './data/objects';
import { abstractCollectionCrawler } from './data/request';
import { upcoming_all_selector } from './data/selectors';


export function getUpcoming(number = Number.MAX_SAFE_INTEGER, region: string = ''): Promise<Upcoming[]> {
  const url = `calendar/?ref_=nv_mv_cal${region != '' ? `&region=${region}` : ''}`;

  return abstractCollectionCrawler<Upcoming>(url, number, 0, upcoming_all_selector, Upcoming);
}