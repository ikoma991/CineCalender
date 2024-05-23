export interface TrendingMoviesProps {
  currentPage: number;
  hasNextPage: boolean;
  results: Movie[];
  totalResults: number;
  totalPages: number;
}

export interface Movie {
  id: number;
  title: string;
  image: string;
  type: MovieType;
  rating: number;
  releaseDate: string;
}

export enum MovieType {
  Movie = 'Movie',
  TVSeries = 'TV Series',
}
export const getTrendingMovies = async (
  type = '',
  page = 1
): Promise<TrendingMoviesProps> => {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/trending?type=${type}&page=${page}`
  );
  const data = res.json();
  return data;
};
