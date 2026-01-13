import { FetchRandomMovie } from "../../components/MainPage/Hero/api/FetchRandomMovie"
import { TopMoviesSection } from "../../components/MainPage/TopMoviesSection/TopMoviesSection"




function MainPage() {

  return (
        <>
        <FetchRandomMovie />
        <TopMoviesSection />
      </>
  )
}

export default MainPage