import { abstractObjectCrawler } from './data/request';
import { actor_birth, actor_born, actor_image, actor_info, actor_name } from './data/selectors';


export function getActor(id: string): Promise<Actor> {
  return abstractObjectCrawler<Actor>(`name/${id}/?ref_=tt_cl_t1`, Actor);
}


export class Actor {
  name: string;
  info: string;
  image: string;
  birth: string;
  bornInfo: string;

  constructor(data_$: any) {
    this.name = data_$(actor_name).text().trim();
    this.info = data_$(actor_info).text().split('\n').join(' ').split('...')[0].trim();
    this.image = data_$(actor_image).attr('src').trim();
    this.birth = data_$(actor_birth[0]).text().trim() + ', ' + data_$(actor_birth[1]).text().trim();
    this.bornInfo = data_$(actor_born).text().trim();
  }
}
