import { getTrending } from '../../index';
import { Trending } from '../data/objects';
import { Watchable } from '../data/types';


test('should get all 100 trending movies', async () => {
  let result: Trending[] = [];
  getTrending().subscribe(data => { result = data });

  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(result).toHaveLength(100);
  expect(Object.keys(result[0])).toEqual(expect.arrayContaining(['id', 'name', 'poster', 'rating', 'year']));
  expect(Object.values(result[0])).not.toContain(null);
  expect(Object.values(result[0])).not.toContain('');
})

test('should get first 5 trending movie', async () => {
  let result = null;
  getTrending(5, Watchable.MOVIE).subscribe(data => { result = data });

  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(result).toHaveLength(5);
})

test('should get first 7 trending tv', async () => {
  let result = null;
  getTrending(7, Watchable.TV).subscribe(data => { result = data });

  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(result).toHaveLength(7);
})
