import { getSearchActor, getSearchWatchable } from '../..';
import { SearchWatchable } from '../search';


test('should get search watchable', async () => {
  let result: SearchWatchable[] = await getSearchWatchable('flash');

  expect(result).toHaveLength(61);
  expect(Object.keys(result[0])).toEqual(expect.arrayContaining(['id', 'name', 'poster', 'year', 'type']));
  expect(Object.keys(result[2])).toEqual(expect.arrayContaining(['id', 'name', 'poster', 'year', 'type', 'part']));

  expect(result).toEqual(expect.arrayContaining([{
    id: 'tt3107288',
    name: 'The Flash',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMDIzNzYwNTctZWY4Mi00YjQ2LWI5YWYtMzdmNDgwMGI4Yzk1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL50.jpg',
    year: '2014',
    type: 'TV Series',
    part: undefined
  }]));
  expect(result).toEqual(expect.arrayContaining([{
    id: 'tt8307884',
    name: 'Flash',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZjkwMDA1ODItMDM1Zi00OGY3LWE0NzItYjg0OGY0MGU2M2NjXkEyXkFqcGdeQXVyOTcyMjQ4MTM@._V1_QL50.jpg',
    year: '2018',
    type: 'Short',
    part: 'I'
  }]));
});

test('should get search actors', async () => {
  let result = await getSearchActor('flash');

  expect(result).toHaveLength(200);
  expect(Object.keys(result[0])).toEqual(expect.arrayContaining(['id', 'name', 'poster']));
  expect(result).toEqual(expect.arrayContaining([{
    id: 'nm1862367',
    name: 'Dwyane Wade',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTkyMzc5NTg4M15BMl5BanBnXkFtZTYwNjE0NzQ0._V1_UY44_CR0,0,32,44_AL_.jpg@._V1_UX1024_CR1024,1024,0,0_AL_.jpg'
  }]));
});
