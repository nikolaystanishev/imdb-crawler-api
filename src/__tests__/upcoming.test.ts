import { Upcoming } from "../data/objects";
import { getUpcoming } from "../upcoming";

test('should get all upcoming movies', async () => {
  let result: Upcoming[] = [];
  getUpcoming().subscribe(data => { result = data });


  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(result).not.toHaveLength(0);
  expect(Object.keys(result[0])).toEqual(expect.arrayContaining(['id', 'name', 'releaseDate', 'year']));
  expect(Object.values(result[0])).not.toContain(null);
  expect(Object.values(result[0])).not.toContain('');
});

test('should get 5 upcoming movies', async () => {
  let result: Upcoming[] = [];
  getUpcoming(5).subscribe(data => { result = data });


  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(result).toHaveLength(5);
});

test('should get 5 BG upcoming movies', async () => {
  let result: Upcoming[] = [];
  getUpcoming(5, 'BG').subscribe(data => { result = data });


  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(result).toHaveLength(5);
});