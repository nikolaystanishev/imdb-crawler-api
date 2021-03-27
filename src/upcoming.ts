import { Upcoming } from "./data/objects";
import { getHTMLPage } from "./data/request";
import { upcoming_all_selector } from "./data/selectors";


export function getUpcoming(number = Number.MAX_SAFE_INTEGER, region: string = ''): Promise<Upcoming[]> {
  const url = `https://www.imdb.com/calendar/?ref_=nv_mv_cal${region != '' ? `&region=${region}` : ""}`

  return getHTMLPage(url).then(
    (data_$) => {
      let upcoming: Upcoming[] = [];

      const movies = data_$(upcoming_all_selector);
      for (let i = 0; i < number && i < movies.length; i++) {
        upcoming.push(new Upcoming(data_$, movies[i]));
      }

      return upcoming;
    }
  );
}