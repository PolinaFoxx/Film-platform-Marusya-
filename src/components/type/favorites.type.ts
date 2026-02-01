import { validateResponse } from "../../api/validateResponse";
import type { MovieBase } from "./film.type/film.type";



export function fetchAddFavorites(movieId: number): Promise<void> {

    // Конвертируем данные в формат x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('id', movieId.toString()); // конвертируем в string для URLSearchParams

    return fetch("https://cinemaguide.skillbox.cc/favorites", {

        //конфигурация запроса
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: formData.toString(),

        //браузер сохраняет куку из ответа сервера
        credentials: 'include'

    }).then(validateResponse).then(() => undefined)
}


export function fetchGetFavorites(): Promise<MovieBase[]> {
    return fetch("https://cinemaguide.skillbox.cc/favorites", {
        //конфигурация запроса
        method: "GET",

        headers: {
            "Content-type": "application/json"
        },
        //браузер отправляет уже существующую куку
        credentials: 'include'//сервер смотрит на куку

    }).then(validateResponse).then((response) => response.json())
}

export function deleteFavoriteFilm(movieId: number): Promise<void> {
    return fetch(`https://cinemaguide.skillbox.cc/favorites/${movieId}`,
        { method: "DELETE",  
            //браузер отправляет уже существующую куку
            credentials: 'include'//сервер смотрит на куку,которую прислали и понимает какую надо удалить.
        }
    ).then(validateResponse)//Проверяем что запрос  успешен
    .then(() => {})//Просто завершаем промис успешно
        // Ничего не возвращаем, потому что DELETE обычно не возвращает данные
}