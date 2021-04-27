import { abstractObjectCrawler } from "./data/request";
import { Actor } from "./data/objects";


export function getActor(id: string): Promise<Actor> {
  return abstractObjectCrawler<Actor>(`name/${id}/?ref_=tt_cl_t1`, Actor);
}
