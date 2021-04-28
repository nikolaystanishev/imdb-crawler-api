import { getActor } from '../..';
import { Actor } from '../actor';

test('should get actor', async () => {
  const result: Actor = await getActor('nm0004989');

  expect(result.name).toBe('Alyson Hannigan');
  expect(result.info).toBe(
    'Alyson Hannigan was born in Washington, D.C., to Emilie (Posner), a real estate agent, and Al Hannigan, a truck' +
    ' driver. She began her acting career in Atlanta at the young age of 4 in commercials sponsoring such companies ' +
    'as McDonald\'s, Six Flags, and Oreos. She is a seasoned television actress veteran, guest starring in Picket ' +
    'Fences (1992),'
  );
  expect(result.image).toBe(
    'https://m.media-amazon.com/images/M/MV5BMTkxODc5ODI5OV5BMl5BanBnXkFtZTcwNzExOTUyNw@@._V1_UX214_CR0,0,214,317_AL_.jpg'
  );
  expect(result.birth).toBe('March 24, 1974');
  expect(result.bornInfo).toBe('Washington, District of Columbia, USA');
});
