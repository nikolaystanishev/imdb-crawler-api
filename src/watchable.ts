import { IdNode } from './data/objects';
import { Parsers } from './data/parsers';
import { abstractCollectionCrawler, abstractObjectCrawler } from './data/request';
import {
  watchable_cast_list,
  watchable_episode_count_episodes_selector,
  watchable_episode_count_heading_selector,
  watchable_episode_count_seasons_selector,
  watchable_genre_selector,
  watchable_id_selector,
  watchable_poster_selector,
  watchable_pro_selector,
  watchable_rating_selector,
  watchable_runtime_selector,
  watchable_similar_movie_container_selector,
  watchable_similar_movie_element_selector,
  watchable_star_characters,
  watchable_star_poster,
  watchable_star_series_info,
  watchable_story_selector,
  watchable_title_selector,
  watchable_year_alt_selector,
  watchable_year_selector
} from './data/selectors';


export function getWatchable(id: string): Promise<Watchable> {
  return abstractObjectCrawler<Watchable>(`/title/${id}/?ref_=nv_sr_1`, Watchable);
}


export class Watchable extends IdNode {
  title: string;
  runtime: string;
  year: string;
  story: string;
  pro: { [key: string]: string[] };
  genre: string[];
  rating: string;
  poster: string;
  episodeCount: { [key: string]: string };
  similarMovies: SimiliarWatchable[];
  stars: Promise<WatchableActor[]>;

  constructor(data_$: any) {
    const id = data_$(watchable_id_selector)[0].attribs['data-const'];
    super(id);

    this.title = this.getTitle(data_$);
    this.runtime = data_$(watchable_runtime_selector).text().trim()
    this.year = data_$(watchable_year_selector).text() || Parsers.parseYear(data_$(watchable_year_alt_selector).text());
    this.story = data_$(watchable_story_selector).text().trim();
    this.pro = this.getPro(data_$);
    this.genre = this.getGenre(data_$);
    this.rating = data_$(watchable_rating_selector).text().trim();
    this.poster = Parsers.parsePoster(data_$(watchable_poster_selector));
    this.episodeCount = this.getEpisodeCount(data_$);
    this.similarMovies = this.getSimilarMoviesById(data_$);
    this.stars = this.getStars();
  }

  getTitle(data_$: any): string {
    const title = data_$(watchable_title_selector).text().trim();
    return title.match(/\d{4}/) == null ? title : title.slice(0, -7);
  }

  getPro(data_$: any): { [key: string]: string[] } {
    let creditDetails: { [key: string]: string[] } = {};

    data_$(watchable_pro_selector).each((index: any, el: any) => {
      let creditText: string = data_$('.inline', el).text().trim().match(/\w*/)[0].toLowerCase().trim();

      creditDetails[creditText] = [];

      creditDetails[creditText].push(
        data_$('a', el).first().text().trim()
      );

      data_$('a', el).nextUntil('span').each((index2: any, element: any) => {
        creditDetails[creditText].push(data_$(element).text().trim());
      });
    });
    return creditDetails;
  }

  getGenre(data_$: any): string[] {
    let genreString = data_$(watchable_genre_selector).text().split('\n');
    genreString.pop();
    genreString.splice(0, 2);
    return genreString.join('').split('|').map((gen: string) => gen.trim());
  }

  getEpisodeCount(data_$: any): { [key: string]: string } {
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

  getSimilarMoviesById(data_$: any): SimiliarWatchable[] {
    const similarMoviesList = data_$(watchable_similar_movie_container_selector).map((index: any, element: any) => {
      const id = data_$(element).find('a')[0].attribs.href.split('/')[2];
      const _title = data_$(element).find(watchable_similar_movie_element_selector).attr('title') || '';
      const _poster = data_$(element).find(watchable_similar_movie_element_selector).attr('loadlate') || '';

      return new SimiliarWatchable(id, _title.trim(), _poster.trim());
    });
    return Array.from(similarMoviesList);
  }

  getStars(): Promise<WatchableActor[]> {
    return abstractCollectionCrawler<WatchableActor>(`/title/${this.id}/fullcredits?ref_=tt_cl_sm#cast`, Number.MAX_SAFE_INTEGER, 1, watchable_cast_list, WatchableActor);
  }
}


export class SimiliarWatchable extends IdNode {
  name: string;
  poster: string;

  constructor(id: string, name: string, poster: string) {
    super(id);
    this.name = name;
    this.poster = poster;
  }
}


export class WatchableActor extends IdNode {
  name: string;
  poster: string;
  characters: string[];
  activeYears: string | null;
  episodeCount: string | null;

  constructor(data_$: any, actor: any) {
    const actorName = data_$(data_$(actor).find("td")[1]).find('a');

    if (actorName.length == 0) {
      super(null);
      this.name = '';
      this.poster = '';
      this.characters = [];
      this.activeYears = null;
      this.episodeCount = null;
      return;
    }

    const id = actorName[0].attribs.href.split('/')[2];
    super(id);

    this.name = actorName.text().trim();
    this.poster = data_$(actor).find(watchable_star_poster).attr('loadlate') ?
      data_$(actor).find(watchable_star_poster).attr('loadlate').trim() :
      data_$(actor).find(watchable_star_poster).attr('src').trim();
    this.characters = [];
    this.activeYears = null;
    this.episodeCount = null;

    data_$(actor).find(watchable_star_characters).children().map((index: any, el: any) => {
      const elString = data_$(el).text().trim();
      if (el.attribs.class == watchable_star_series_info) {
        const additionalInfo = elString.split(', ');
        this.episodeCount = additionalInfo[0].split(' ')[0];
        this.activeYears = additionalInfo[1];
      } else if (el.name == 'a') {
        this.characters.push(elString);
      }
    });
  }
}
