import { z } from "zod";
import { validateResponse } from "../../../api/validateResponse";
import { MovieBaseSchema } from "../../type/film.type/film.type";

// Схема для одного фильма
export const FilmSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  plot: z.string().nullable(),
  runtime: z.number(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string().nullable(),
  status: z.string(),
  posterUrl: z.string().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string().nullable(),
  trailerYouTubeId: z.string().nullable(),
  tmdbRating: z.number().nullable(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
});

export const FilmsResponseSchema = z.array(MovieBaseSchema);

export type Film = z.infer<typeof FilmSchema>;
export type FilmsResponse = z.infer<typeof FilmsResponseSchema>;

export function fetchFilmsByGenre(genreSlug: string): Promise<FilmsResponse> {
  return fetch(`https://cinemaguide.skillbox.cc/movie?genre=${genreSlug}`)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => {
      try {
        // Валидируем данные с помощью Zod
        return FilmsResponseSchema.parse(data);
      } catch (error) {
        console.error("Ошибка валидации данных:", error);
        // В случае ошибки валидации, возвращаем данные как есть (или обрабатываем иначе)
        // Или пробрасываем ошибку дальше
        throw new Error(`Ошибка валидации данных для жанра ${genreSlug}`);
      }
    })
    .catch(error => {
      console.error(`Ошибка при загрузке фильмов жанра ${genreSlug}:`, error);
      throw error;
    });
}

export function fetchFilmsCount(genreSlug: string | null, count: number): Promise<FilmsResponse> {
  return fetch(`https://cinemaguide.skillbox.cc/movie?genre=${genreSlug}&count=${count}`)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => {
      try {
        // Валидируем данные с помощью Zod
        return FilmsResponseSchema.parse(data);
      } catch (error) {
        console.error("Ошибка валидации данных:", error);
        // В случае ошибки валидации, возвращаем данные как есть (или обрабатываем иначе)
        // Или пробрасываем ошибку дальше
        throw new Error(`Ошибка валидации данных для жанра ${genreSlug}`);
      }
    })
    .catch(error => {
      console.error(`Ошибка при загрузке фильмов жанра ${genreSlug}:`, error);
      throw error;
    });
}



