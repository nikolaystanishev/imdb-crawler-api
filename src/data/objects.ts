import { Parsers } from './parsers';
import {
  trending_id_selector,
  trending_name_selector,
  trending_poster_selector,
  trending_rating_selector,
  trending_year_selector,
  watchable_episode_count_episodes_selector,
  watchable_episode_count_heading_selector,
  watchable_episode_count_seasons_selector,
  watchable_genre_selector,
  watchable_poster_selector,
  watchable_pro_selector,
  watchable_rating_selector,
  watchable_runtime_selector,
  watchable_similar_movie_container_selector,
  watchable_similar_movie_element_selector,
  watchable_story_selector,
  watchable_title_selector,
  watchable_year_alt_selector,
  watchable_year_selector
} from './selectors';


export class Trending {
  id: string;
  name: string;
  poster: string;
  year: string;
  rating: string;

  constructor(data_$: any, watchable: any) {
    this.id = data_$(watchable).find(trending_id_selector)[0].attribs.href.split('/')[2];
    this.name = data_$(watchable).find(trending_name_selector).text();
    this.poster = Parsers.parsePoster(data_$(watchable).find(trending_poster_selector));
    this.year = Parsers.parseYear(data_$(watchable).find(trending_year_selector).text());
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
    this.year = Parsers.parseYear(data_$(movie).text().trim().slice(-6, -1));
  }
}

export class Watchable {
  title: string;
  runtime: string;
  year: string;
  story: string;
  pro: { [key: string]: string[] };
  genre: string[];
  rating: string;
  poster: string;
  episodeCount: { [key: string]: string };
  similarMovieTitle: { id: string, name: string, poster: string }[];

  constructor(data_$: any) {
    this.title = getTitle(data_$);
    this.runtime = data_$(watchable_runtime_selector).text().trim()
    this.year = data_$(watchable_year_selector).text() || Parsers.parseYear(data_$(watchable_year_alt_selector).text());
    this.story = data_$(watchable_story_selector).text().trim();
    this.pro = getPro(data_$);
    this.genre = getGenre(data_$);
    this.rating = data_$(watchable_rating_selector).text().trim();
    this.poster = Parsers.parsePoster(data_$(watchable_poster_selector));
    this.episodeCount = getEpisodeCount(data_$);
    this.similarMovieTitle = getSimilarMoviesById(data_$);
  }
}

function getTitle(data_$: any): string {
  const title = data_$(watchable_title_selector).text().trim();
  return title.match(/\d{4}/) == null ? title : title.slice(0, -7);
}

function getPro(data_$: any): { [key: string]: string[] } {
  let creditDetails: { [key: string]: string[] } = {};

  data_$(watchable_pro_selector).each(function (index: any, el: any) {
    let creditText: string = data_$('.inline', el).text().trim().match(/\w*/)[0].toLowerCase().trim();

    creditDetails[creditText] = [];

    creditDetails[creditText].push(
      data_$('a', el).first().text().trim()
    );

    data_$('a', el).nextUntil('span').each(function (index2: any, element: any) {
      creditDetails[creditText].push(data_$(element).text().trim());
    });
  });
  return creditDetails;
}

function getGenre(data_$: any): string[] {
  let genreString = data_$(watchable_genre_selector).text().split('\n');
  genreString.pop();
  genreString.splice(0, 2);
  return genreString.join('').split('|').map((gen: string) => gen.trim());
}

function getEpisodeCount(data_$: any): { [key: string]: string } {
  let headingText = data_$(watchable_episode_count_heading_selector).text().trim();
  if (headingText == 'Episode Guide') {
    return {
      episodes: data_$(watchable_episode_count_episodes_selector).text().trim(),
      seasons: data_$(watchable_episode_count_seasons_selector).text().trim()
    };
  } else {
    return {};
  }
}

function getSimilarMoviesById(data_$: any): { id: string, name: string, poster: string }[] {
  const similarMoviesList = data_$(watchable_similar_movie_container_selector).map((index: any, element: any) => {
    const id = data_$(element).find('a')[0].attribs.href.split('/')[2];
    const _title = data_$(element).find(watchable_similar_movie_element_selector).attr('title') || '';
    const _poster = data_$(element).find(watchable_similar_movie_element_selector).attr('loadlate') || '';

    return { id, name: _title.trim(), poster: _poster.trim() };
  });
  return Array.from(similarMoviesList);
}
