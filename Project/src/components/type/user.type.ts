import z from "zod";
import { validateResponse } from "../../api/validateResponse";
import { queryClient } from "../../api/queryClient";


//типизация схемы юзера
export const UserSchema = z.object({
    email: z.string(),
    password: z.string().optional(),
    name: z.string(),
    surname: z.string(),
      favorites: z.array(z.string()),
})

export type User = z.infer<typeof UserSchema>

//регестрация-создание записи  в БД
export function registerUser(data: { email: string, password: string, name: string, surname: string }): Promise<void> {
    //функция запроса возвращает Промис. А промис не возвращает данные void

    // Конвертируем данные в формат x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('name', data.name);
    formData.append('surname', data.surname);

    //отправляем данные 
    return fetch("https://cinemaguide.skillbox.cc/user", {
        //конфигурация запроса
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    }).then(() => undefined) 
    //undefined так как Promise<void>
}

//отдельно залогиниться (через login), чтобы получить куку
// для входа уже зарегПользоват-авторизация пользователя
export function login(data: { email: string, password: string }): Promise<void> {

    // Конвертируем данные в формат x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('email', data.email);
    formData.append('password', data.password);


    return fetch("https://cinemaguide.skillbox.cc/auth/login", {
        
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

//fetchMe — получает данные пользователя с сервера и возвращает их в виде обещания Promise<User>
export function fetchMe(): Promise<User> {
    return fetch("https://cinemaguide.skillbox.cc/profile", {
                //браузер отправляет уже существующую куку
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 401) {
                // Сессия истекла — сбрасываем кэш
                queryClient.setQueryData(["users", "me"], null);
                throw new Error('Сессия истекла, войдите снова');
            }
            return response;
        })
        .then(validateResponse)
        .then(response => response.json())
        .then(data => UserSchema.parse(data));
}



//Делаем “уничтожение/аннулирование” авторизации пользователя, то есть меняем состояние на сервере.
//прекращение авторизации пользователя
export function logout(): Promise<Response> {
    return fetch("https://cinemaguide.skillbox.cc/auth/logout", {
        //конфигурация запроса
        method: "GET",
        
        headers: {
            "Content-type": "application/json"
        },
        //браузер отправляет уже существующую куку
                credentials: 'include'//сервер смотрит на куку,которую прислали и понимает какую надо удалить.

    }).then(validateResponse).then((response) => response)
}