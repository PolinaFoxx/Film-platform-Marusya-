import { z } from "zod";
import { validateResponse } from "../../../api/validateResponse";

// Для одного жанра (строка)
export const GenreSlugSchema = z.string();

// Для всего ответа сервера (массив строк)
export const GenresResponseSchema = z.array(GenreSlugSchema);

// Типы TypeScript, которые генерирует Zod
export type GenreSlug = z.infer<typeof GenreSlugSchema>;
export type GenresResponse = z.infer<typeof GenresResponseSchema>;

// Преобразовываем в объект
export const GenreObjectSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  image: z.string().nullable().optional(), 
});

// Схема для МАССИВА объектов
export const GenresArraySchema = z.array(GenreObjectSchema);

// Типы
export type GenreObject = z.infer<typeof GenreObjectSchema>;
export type GenresArray = z.infer<typeof GenresArraySchema>;

// Функция преобразования строк в объекты
export function createGenreObjects(slugs: GenresResponse): GenresArray {
  return slugs.map((slug, index) => {
    // Преобразуем slug в читаемое название
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

// Функция для форматирования названия жанра
function formatGenreName(slug: string): string {
  // Преобразуем slug в читаемый формат
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Основная функция получения жанров с преобразованием
export function fetchGenres(): Promise<GenresArray> {
  return fetch("https://cinemaguide.skillbox.cc/movie/genres")
    .then(validateResponse)
    .then(response => response.json())
    .then(data => {
      // Валидируем полученные данные как массив строк
      const slugs = GenresResponseSchema.parse(data);
      // Преобразуем в массив объектов
      return createGenreObjects(slugs);
    }); 
}