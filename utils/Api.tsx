export interface MovieProps {
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
export class Api {
  static baseUrl = process.env.EXPO_PUBLIC_API_URL;

  static async getTrendingMovies(type = '', page = ''): Promise<MovieProps> {
    const res = await fetch(
      `${this.baseUrl}/trending?type=${type}&page=${page}`
    );
    const data = res.json();
    return data;
  }
}
