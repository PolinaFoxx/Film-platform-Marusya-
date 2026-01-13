import { HeroBtns } from "./HeroBtns/HeroBtns"
import { HeroMeta } from "./HeroMeta/HeroMeta"
import { HeroPoster } from "./HeroPoster/HeroPoster"
import { HeroTitle } from "./HeroTitle/HeroTitle"
import './Hero.scss'
import type { MovieBase } from "../../type/film.type/film.type"
import { Link } from "react-router-dom"

type HeroSize = "full" | "small";
// type HeroAdaptive = "desktop" | "mobile";


interface HeroProps {
  movie: MovieBase;
  showAboutButton?: boolean;
  showHistoryButton?: boolean;
  size?: HeroSize;
  // adaptive?: HeroAdaptive;
  onRandomClick?: () => void,
  onSwitchToAuth?: () => void
};

export const Hero = ({
  movie,
  showAboutButton,
  showHistoryButton,
  size = "full",
  onRandomClick,
  onSwitchToAuth,
  // adaptive = "desktop",
}: HeroProps) => {


  if (size === "small"

  ) {
    return (
      <div
        className='  hero-small
    hero-small--mobile'
      
      >
        <HeroPoster posterUrl={movie.posterUrl ?? 'Недоступен'} title={movie.title} variant="xs" />
        <div className="hero-small__content">
          <HeroMeta
            tmdbRating={movie.tmdbRating}
            releaseYear={movie.releaseYear}
            genre={movie.genres[0] || "Не указано"}
            runtime={movie.runtime}
            variant="xs"
          />
          <h3 className="hero-small__title">{movie.title}</h3>
        </div>
      </div>
    );
  }
  // if (size === "small"){
  // if (adaptive === "mobile") {

  //   return (
  //     <div className="hero-small hero-small--mobile">
  //       <HeroPoster posterUrl={movie.posterUrl} title={movie.title} variant="xs" />
  //       <div className="hero-small__content">
  //         <HeroMeta
  //           tmdbRating={movie.tmdbRating}
  //           releaseYear={movie.releaseYear}
  //           genre={movie.genres[0] || "Не указано"}
  //           runtime={movie.runtime}
  //           variant="xs"
  //         />
  //         <h3 className="hero-small__title">{movie.title}</h3>
  //       </div>
  //     </div>
  //   );
  // }
  // }
  //если size === 'full'
  return (
    <section className="hero">
      <div className="container">
        {/* <h1 className="visually-hidden">Маруся - онлайн кинотеатр</h1> */}

        <div className="hero__content">
          <div className="hero__wrapper">

            <HeroMeta
              tmdbRating={movie.tmdbRating}
              releaseYear={movie.releaseYear}
              genre={movie.genres[0] || "Не указано"}
              runtime={movie.runtime}
            />
            <HeroTitle
              title={movie.title}
              plot={movie.plot || "Описание отсутствует"}
            />
            <HeroBtns
              showAboutButton={showAboutButton}
              showHistoryButton={showHistoryButton}
              onRandomClick={onRandomClick}
              movie={movie}
              onSwitchToAuth={onSwitchToAuth}
            />
          </div>
          <Link to={`/movie/${movie.id}`}>
            <HeroPoster
              posterUrl={movie.posterUrl ?? 'Недоступен' }
              title={movie.title}
            />
          </Link>

        </div>
      </div>
    </section>
  );
};

