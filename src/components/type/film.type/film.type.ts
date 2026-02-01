import {  z } from 'zod';

// Базовая схема (для карточек, Hero, главной страницы)
export const MovieBaseSchema = z.object({
  id: z.number(),
  title: z.string(),
  posterUrl: z.string().nullable(),
  tmdbRating: z.number().nullable(),
  releaseYear: z.number(),
  runtime: z.number(),
  genres: z.array(z.string()),
  plot: z.string().nullable().optional(),//дает тип plot?: string | null
});

// Полная схема (для страницы фильма)
export const MovieFullSchema = MovieBaseSchema.extend({
   plot: z.string().nullable(),
  originalTitle: z.string(),
  language: z.string(),
  releaseDate: z.string(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string().nullable(),
  status: z.string(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string().nullable(),
  trailerYouTubeId: z.string().nullable(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
});



// Типы на основе схем
export type MovieBase = z.infer<typeof MovieBaseSchema>;
export type MovieFull = z.infer<typeof MovieFullSchema>;

// Алиасы для обратной совместимости
export type Movie = MovieBase; // или MovieFull в зависимости от контекста
export type Film = MovieFull; // для TypeFilmById