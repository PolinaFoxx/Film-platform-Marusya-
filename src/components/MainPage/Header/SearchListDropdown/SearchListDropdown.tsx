import './SearchListDropdown.scss'

import type { FC } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../../Hero/Hero";
import type { MovieBase } from "../../../type/film.type/film.type";
interface FilterByTitleListFilmsProps {
  filteredList: MovieBase[];
}

const SearchListDropdown: FC<FilterByTitleListFilmsProps> = ({
  filteredList,
}) => {

  return (
    <div className="search search--mobile">
      <ul className="search__list">
        {filteredList.map((movie) => (
          <li key={movie.id} className="search__item">
            <Link to={`/movie/${movie.id}`} className="search__link">
              <Hero movie={movie} size="small" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SearchListDropdown