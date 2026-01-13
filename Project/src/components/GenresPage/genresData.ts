import dramaImg from "../../assets/images/drama.jpg";
import comedyImg from "../../assets/images/comedy.jpg";
import detectiveImg from "../../assets/images/detective.jpg";
import familyImg from "../../assets/images/family.jpg";
import historyImg from "../../assets/images/history.jpg";
import thrillerImg from "../../assets/images/thriller.jpg";
import fantasyImg from "../../assets/images/fantasy.jpg";
import adventureImg from "../../assets/images/adventure.jpg";
import horrorImg from "../../assets/images/horror.jpg";
import scifiImg from "../../assets/images/scifi.jpg";
import standupImg from "../../assets/images/stand-up.jpg";
import romanceImg from "../../assets/images/romance.jpg";
import musicImg from "../../assets/images/music.jpg";
import crimeImg from "../../assets/images/crime.jpg";
import tvMovieImg from "../../assets/images/tv-movie.jpg";
import documentaryImg from "../../assets/images/documentary.jpg";
import actionImg from "../../assets/images/action.jpg";
import westernImg from "../../assets/images/western.jpg";
import animationImg from "../../assets/images/animation.jpg";
import warImg from "../../assets/images/war.jpg";
import mysteryImg from "../../assets/images/mystery.jpg";


type Genre = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

// Массив с данными жанров
const genresData: Genre[] = [
  { id: 1, name: 'Историческое', slug: 'history', image: historyImg },
  { id: 2, name: 'Ужасы', slug: 'horror', image: horrorImg },
  { id: 3, name: 'Научный', slug: 'scifi', image: scifiImg },
  { id: 4, name: 'Стендап', slug: 'stand-up', image: standupImg },
  { id: 5, name: 'Фантастика', slug: 'fantasy', image: fantasyImg },
  { id: 6, name: 'Драма', slug: 'drama', image: dramaImg },
  { id: 7, name: 'Мистика', slug: 'mystery', image: mysteryImg },
  { id: 8, name: 'Детектив', slug: 'detective', image: detectiveImg },
  { id: 9, name: 'Семейное', slug: 'family', image: familyImg },
  { id: 10, name: 'Комедия', slug: 'comedy', image: comedyImg },
  { id: 11, name: 'Романтика', slug: 'romance', image: romanceImg },
  { id: 12, name: 'Мюзиклы', slug: 'music', image: musicImg },
  { id: 13, name: 'Криминал', slug: 'crime', image: crimeImg },
  { id: 14, name: 'ТВ-фильм', slug: 'tv-movie', image: tvMovieImg },
  { id: 15, name: 'Документальный', slug: 'documentary', image: documentaryImg },
  { id: 16, name: 'Боевик', slug: 'action', image: actionImg },
  { id: 17, name: 'Триллер', slug: 'thriller', image: thrillerImg },
  { id: 18, name: 'Вестерн', slug: 'western', image: westernImg },
  { id: 18, name: 'Анимация', slug: 'animation', image: animationImg },
  { id: 20, name: 'Военный ', slug: 'war', image: warImg },
  { id: 21, name: 'Приключения', slug: 'adventure', image: adventureImg },
];

export default genresData