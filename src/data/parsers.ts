export class Parsers {
  static parsePoster(poster: any) {
    return poster[0].attribs.src.split('@._')[0] + '@._V1_QL50.jpg';
  }

  static parseYear(year: any) {
    let yearMatch = year.match(/\d{4}–\d{4}/);
    if (yearMatch == null) {
      yearMatch = year.match(/\d{4}/);
    }
    if (yearMatch != null) {
      return yearMatch[0].trim();
    }
    return '';
  }
}