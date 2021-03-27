import { getWatchable } from '../..';
import { Watchable } from '../data/objects';

test('should get movie', async () => {
  let result: Watchable = await getWatchable('tt1986180');

  expect(result.title).toBe('The Test');
  expect(result.runtime).toBe('1h 29min');
  expect(result.year).toBe('2012');
  expect(result.story).toBe(
    'A guy puts his unwitting bride-to-be through a series of increasingly bizarre "stress tests" to see if she\'s worthy of marriage.'
  );
  expect(result.pro['director']).toEqual(expect.arrayContaining(['Jeremy Saville']));
  expect(result.pro['writer']).toEqual(expect.arrayContaining(['Jeremy Saville']));
  expect(result.pro['stars']).toEqual(expect.arrayContaining(['Jeremy Saville', 'Kelly Sullivan', 'Stephen Frejek']));
  expect(result.genre).toEqual(expect.arrayContaining(['Comedy']));
  expect(result.rating).toBe('6.0');
  expect(result.poster).toBe(
    'https://m.media-amazon.com/images/M/MV5BMTYwNTgzMjM5M15BMl5BanBnXkFtZTcwNDUzMTE1OA@@._V1_QL50.jpg'
  );
  expect(result.episodeCount).toMatchObject({});
  expect(result.similarMovieTitle).toHaveLength(12);
  expect(result.similarMovieTitle).toEqual(expect.arrayContaining([{
    id: 'tt7620554',
    name: 'Loqueesha',
    poster: 'https://m.media-amazon.com/images/M/MV5BOTQzZDIzNTktZDcxZC00MzI2LWJmZWQtOGZjNWVhMDc0OTc5XkEyXkFqcGdeQXVyMzMwMjI2NA@@._V1_UY190_CR7,0,128,190_AL_.jpg'
  }]));
});

test('should get series', async () => {
  let result: Watchable = await getWatchable('tt0460649');

  expect(result.title).toBe('How I Met Your Mother')
  expect(result.runtime).toBe('22min')
  expect(result.year).toBe('2005–2014')
  expect(result.story).toBe(
    'Ted Mosby sits down with his kids, to tell them the story of how he met their mother. The story is told through ' +
    'memories of his friends Marshall, Lily, Robin, and Barney Stinson. All legendary 9 seasons lead up to the moment' +
    ' of Ted\'s final encounter with "the one."'
  )
  expect(result.pro['director']).toEqual(undefined);
  expect(result.pro['creators']).toEqual(expect.arrayContaining(['Carter Bays', 'Craig Thomas']));
  expect(result.pro['stars']).toEqual(expect.arrayContaining(['Josh Radnor', 'Jason Segel', 'Cobie Smulders']));
  expect(result.genre).toEqual(expect.arrayContaining(['Comedy', 'Romance']));
  expect(result.rating).toBe('8.3')
  expect(result.poster).toBe(
    'https://m.media-amazon.com/images/M/MV5BNjg1MDQ5MjQ2N15BMl5BanBnXkFtZTYwNjI5NjA3._V1_UY268_CR9,0,182,268_AL_.jpg@._V1_QL50.jpg'
  )
  expect(result.episodeCount).toMatchObject({})
  expect(result.similarMovieTitle).toHaveLength(12)
  expect(result.similarMovieTitle).toEqual(expect.arrayContaining([{
    'id': 'tt0108778',
    'name': 'Friends',
    'poster': 'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UY190_CR0,0,128,190_AL_.jpg'
  }]));
})