import { getTrending } from '../..';
import { Trending } from '../data/objects';
import { Watchable } from '../data/types';


test('should get all 100 trending movies', async () => {
  let result: Trending[] = await getTrending();

  expect(result).toHaveLength(100);
  expect(Object.keys(result[0])).toEqual(expect.arrayContaining(['id', 'name', 'poster', 'rating', 'year']));
  expect(Object.values(result[0])).not.toContain(null);
  expect(Object.values(result[0])).not.toContain('');
})

test('should get first 5 trending movie', async () => {
  let result = await getTrending(5, Watchable.MOVIE);

  expect(result).toHaveLength(5);
})

test('should get first 7 trending tv', async () => {
  let result = await getTrending(7, Watchable.TV);

  expect(result).toHaveLength(7);
})
