// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { useSearchParams } from "react-router-dom";

// export const Pagination = () => {
//   //начальное значение
//   const count = 15;
//   const [searchParams] = useSearchParams();
//   const genre = searchParams.get("genre");
//   const [currentCount, setCurrentCount] = useState(count);
//   // const [viewButton, setviewButton] = useState(true);

//   const filterGenreCountQuery = useQuery({
//     queryFn: () => getFilterGenreCount(genre, currentCount),
//     queryKey: ["filterCountGenre", genre, currentCount],
//     enabled: !!genre,
//   });

//   const filterGenreQuery = useQuery({
//     queryFn: () => getFilterGenre(genre),
//     queryKey: ["filterGenre", genre],
//     enabled: !!genre,
//   });

//   console.log(filterGenreQuery.data?.length);

//   // if (currentCount > filterGenreQuery.data?.length) {
//   //   setviewButton(false);
//   // }

//   const isViewBtn =
//     filterGenreQuery.status === "success" &&
//     filterGenreQuery.data?.length > 0 &&
//     currentCount < filterGenreQuery.data.length;

//   const handleShowMore = () => {
//     setCurrentCount((prev) => prev + 10); // увеличиваем на 10
//   };

//   switch (filterGenreCountQuery.status) {
//     case "pending":
//       return(<>загрузка</>)
//     case "success":
//       return (
//         <FilterByGenreListFilms
//           filteredList={filterGenreCountQuery.data}
//           genre={genre}
//           count={currentCount}
//           onShowMore={handleShowMore}
//           isViewBtn={isViewBtn}
//         />
//       );
//     case "error":
//       return (
//         <div>
//           <span>Произошла ошибка:</span>
//           <button onClick={() => filterGenreCountQuery.refetch()}>
//             Повторить запрос
//           </button>
//         </div>
//       );
//   }
// };