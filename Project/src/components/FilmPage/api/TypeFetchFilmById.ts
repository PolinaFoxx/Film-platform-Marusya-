// TypeFilmById.ts
import { validateResponse } from "../../../api/validateResponse";
import { MovieFullSchema, type MovieFull } from "../../type/film.type/film.type";
// Импортируем схему и тип из film.types.ts
// import { MovieFullSchema, type MovieFull } from "../../../type/film.type/film.type.ts"; 
// Реэкспортируем с другими именами, если нужно
export const FilmSchema = MovieFullSchema;
export type Film = MovieFull;

export function fetchFilmById(movieId: string | number): Promise<MovieFull> {
  return fetch(`https://cinemaguide.skillbox.cc/movie/${movieId}`)
    .then(validateResponse)
    .then(res => res.json())
    .then(data => {
      try {
        // Используем импортированную схему
        return MovieFullSchema.parse(data);
      } catch (error) {
        console.error('Ошибка валидации фильма:', error);
        console.log('Данные с ошибкой:', JSON.stringify(data, null, 2));
        throw new Error(`Ошибка валидации фильма с id ${movieId}`);
      }
    });
}

