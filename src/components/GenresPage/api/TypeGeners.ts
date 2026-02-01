import { z } from "zod";
import { validateResponse } from "../../../api/validateResponse";

export const GenreSlugSchema = z.string();
export const GenresResponseSchema = z.array(GenreSlugSchema);

export type GenreSlug = z.infer<typeof GenreSlugSchema>;
export type GenresResponse = z.infer<typeof GenresResponseSchema>;

export const GenreObjectSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  image: z.string().nullable().optional(),
});

export const GenresArraySchema = z.array(GenreObjectSchema);

export type GenreObject = z.infer<typeof GenreObjectSchema>;
export type GenresArray = z.infer<typeof GenresArraySchema>;

export function createGenreObjects(slugs: GenresResponse): GenresArray {
  return slugs.map((slug, index) => {
    const name = formatGenreName(slug);

    const genreObject = {
      id: index + 1,
      slug: slug,
      name: name,
      image: null
    };

    return GenreObjectSchema.parse(genreObject);
  });
}

function formatGenreName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function fetchGenres(): Promise<GenresArray> {
  return fetch("https://cinemaguide.skillbox.cc/movie/genres")
    .then(validateResponse)
    .then(response => response.json())
    .then(data => {
      const slugs = GenresResponseSchema.parse(data);
      return createGenreObjects(slugs);
    });
}