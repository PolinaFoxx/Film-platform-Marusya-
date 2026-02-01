import { validateResponse } from "../../../../api/validateResponse";
import { MovieBaseSchema, type MovieBase } from "../../../type/film.type/film.type";

export const MovieSchemaRandom = MovieBaseSchema;
export type Movie = MovieBase;

export function fetchRandomFilm(): Promise<MovieBase> {
  return fetch("https://cinemaguide.skillbox.cc/movie/random")
    .then(validateResponse)
    .then(response => response.json())
    .then(data => MovieBaseSchema.parse(data));
}
