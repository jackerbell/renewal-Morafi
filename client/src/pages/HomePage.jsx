import HeroSlide from "../components/common/HeroSlide.jsx";
import tmdbConfigs from "../api/configs/tmdb.configs.js";

const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
    </>
  );
};

export default HomePage;