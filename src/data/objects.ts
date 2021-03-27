import { trending_id_selector, trending_name_selector, trending_poster_selector, trending_rating_selector, trending_year_selector } from './selectors';


export class Trending {
  id: string;
  name: string;
  poster: string;
  year: string;
  rating: string;

  constructor(data_$: any, watchable: any) {
    this.id = data_$(watchable).find(trending_id_selector)[0].attribs.href.split('/')[2];
    this.name = data_$(watchable).find(trending_name_selector).text();
    this.poster = data_$(watchable).find(trending_poster_selector)[0].attribs.src.split('@._')[0] + '@._V1_QL50.jpg';
    this.year = data_$(watchable).find(trending_year_selector).text().replace('(', '').replace(')', '');
    this.rating = data_$(watchable).find(trending_rating_selector).text();
  }
}


export class Upcoming {
  id: string;
  name: string;
  releaseDate: string;
  year: string;

  constructor(data_$: any, movie: any) {
    this.id = data_$(movie).children('a').attr('href').split('/')[2];
    this.name = data_$(movie).children('a').text();
    this.releaseDate = data_$(movie).parent('ul').prev('h4').text();
    this.year = data_$(movie).text().trim().slice(-6, -1).replace('(', '').replace(')', '');
  }
}
