import { Watchable } from './data/objects';
import { abstractObjectCrawler } from './data/request';


export function getWatchable(id: string): Promise<Watchable> {
  return abstractObjectCrawler<Watchable>(`/title/${id}/?ref_=nv_sr_1`, Watchable);
}
