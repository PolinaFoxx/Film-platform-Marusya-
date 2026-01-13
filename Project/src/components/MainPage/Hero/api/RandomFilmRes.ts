import { validateResponse } from "../../../../api/validateResponse";
import { MovieBaseSchema, type MovieBase } from "../../../type/film.type/film.type";


// Используем общую схему
export const MovieSchemaRandom = MovieBaseSchema;

// Экспортируем тот же тип
export type Movie = MovieBase;

// Функция для получения рандомного фильма
export function fetchRandomFilm(): Promise<MovieBase> {
  return fetch("https://cinemaguide.skillbox.cc/movie/random")
    .then(validateResponse)
    .then(response => response.json())
    .then(data => MovieBaseSchema.parse(data));
}

// //Определяем типы состояний для запроса
// interface IdleRequestState {
//   status: "Idle";
// }

// interface LoadingRequestState {
//   status: "pending";
// }

// interface SuccessRequestState {
//   status: "success";
//   data: Movie;//данные которые сервер вернул
// }

// interface ErrorRequestState {
//   status: "error";
//   error: unknown;
// }

// type RequestState = IdleRequestState | LoadingRequestState | SuccessRequestState | ErrorRequestState;



// // 4 Хук возвращает состояние запроса RequestState и функцию для повторного запроса refetch
// export function useRandomFilm() {
//   const [state, setState] = useState<RequestState>({ status: "pending" }); 

//   useEffect(() => {
//     if (state.status === "pending") {
//       fetchRandomFilm()
//         .then((data) => {
//           setState({ status: "success", data });
//         })
//         .catch((error) => {
//           setState({ 
//             status: "error", 
//             error: error instanceof Error ? error : new Error("Неизвестная ошибка") 
//           });
//         });
//     }
//   }, [state.status]); // Зависимость от state.status

//   const refetch = () => {
//     setState({ status: "pending" });
//   };

//   return { state, refetch };
// }



