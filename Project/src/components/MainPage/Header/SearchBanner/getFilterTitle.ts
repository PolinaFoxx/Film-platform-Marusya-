import z from "zod";
import { validateResponse } from "../../../../api/validateResponse";
import { MovieBaseSchema } from "../../../type/film.type/film.type";


// Создаём схему для списка фильмов
const MovieListSchema = z.array(MovieBaseSchema);
export type MovieList = z.infer<typeof MovieListSchema>;

export function fetchFilterTitle(title: string): Promise<MovieList> {
  return fetch(`https://cinemaguide.skillbox.cc/movie?count=5&title=${title}`)
    .then(validateResponse)
    .then(res => res.json())
    .then(data => MovieListSchema.parse(data));
}