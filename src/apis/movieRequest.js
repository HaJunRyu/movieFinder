const END_POINT = 'https://yts.mx/api/v2/list_movies.json';
const LIMIT = 20;
// minimum_rating 별점 필터링
// genre 장르 필터링
// sort_by 정렬기준
// order_by 내림차순 오름차순 설정

const movieRequest = {
  async fetchMovieList() {
    const res = await fetch(`${END_POINT}?limit=${LIMIT}`);
    return await res.json();
  },
  async searchMovies(query_term, page) {
    const res = await fetch(`${END_POINT}?limit=${LIMIT}&query_term=${query_term}&page=${page}`);
    return await res.json();
  }
};

export default movieRequest;
