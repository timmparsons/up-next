export type MovieItem = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
};

export type MovieResponse = {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
};

export type ShowsListProps = {
  title: string;
  data: MovieItem[];
};
