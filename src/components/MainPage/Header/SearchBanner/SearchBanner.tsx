import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import SearchListDropdown from "../SearchListDropdown/SearchListDropdown";
import { fetchFilterTitle } from "./getFilterTitle";

const SearchBanner = () => {
  const [searchParams] = useSearchParams();
  const searchTitle = searchParams.get("searchTitle");

  const titleSearchQuery = useQuery({
    queryFn: () =>
      searchTitle ? fetchFilterTitle(searchTitle) : [],
    queryKey: ["filterTitle", searchTitle],
    enabled: !!searchTitle,
  });

  switch (titleSearchQuery.status) {
    case "success":

      if (!titleSearchQuery.data || titleSearchQuery.data.length === 0) {
        return null;
      }
      return <SearchListDropdown filteredList={titleSearchQuery.data} />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка:</span>
          <button onClick={() => titleSearchQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
export default SearchBanner