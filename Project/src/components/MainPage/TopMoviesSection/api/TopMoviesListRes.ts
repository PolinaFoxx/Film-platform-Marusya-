import { z } from "zod";
import { validateResponse } from "../../../../api/validateResponse";

// Схема одного фильма из топа
export const FilmTopSchema = z.object({
  id: z.number(),
  title: z.string(),
  posterUrl: z.string().nullable(),
});

export type TopFilm = z.infer<typeof FilmTopSchema>;

export const TopFilmsArraySchema = z.array(FilmTopSchema);

export type TopFilms = z.infer<typeof TopFilmsArraySchema>;

export function fetchTopFilms(): Promise<TopFilms> {
  return fetch("https://cinemaguide.skillbox.cc/movie/top10") 
    .then(validateResponse)
    .then(response => response.json())
    .then(data => TopFilmsArraySchema.parse(data)); // Парсим как МАССИВ
}