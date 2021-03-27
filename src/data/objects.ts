import { trending_id_selector, trending_name_selector, trending_poster_selector, trending_rating_selector, trending_year_selector } from './selectors';


export class Trending {
  id: string;
  name: string;
  poster: string;
  year: string;
  rating: string;

  constructor(data_$: any, index: number) {
    this.id = data_$(trending_id_selector.replace('${0}', `${index}`))[0].attribs.href.split("/")[2];
    this.name = data_$(trending_name_selector.replace('${0}', `${index}`)).text();
    this.poster = data_$(trending_poster_selector.replace('${0}', `${index}`))[0].attribs.src.split("@._")[0] + "@._V1_QL50.jpg";
    this.year = data_$(trending_year_selector.replace('${0}', `${index}`)).text().replace('(', '').replace(')', '');
    this.rating = data_$(trending_rating_selector.replace('${0}', `${index}`)).text();
  }
}
