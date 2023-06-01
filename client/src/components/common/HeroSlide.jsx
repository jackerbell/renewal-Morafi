import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {Box, Button, Chip, Divider, stack, Typography, useTheme} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import { setIsGlobalLoading } from "../../redux/features/globalLoadingSlice.js";
import { routesGen } from "../../routes/routes.jsx";

import uiConfigs from "../../configs/ui.config.js";

import CircularRate from "./CircularRate.jsx";

import tmdbConfigs from "../../api/configs/tmdb.configs.js";
import genreApi from "../../api/modules/genre.api.js";
import mediaApi from "../../api/modules/media.api.js";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const {response, err} = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      });

      console.log( response );

      if(response) setMovies(response.results);
      if(err) toast.error(err.message);
      dispatch(setIsGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setIsGlobalLoading(true));
      const {response,err} = await genreApi.getList({mediaType});

      if(response) {
        setGenres(response.genres);
        getMedias()
      } 
      if(err) {
        toast.error(err.message);
        setIsGlobalLoading(false);
      } 
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch])
  
  return (
    <Box sx={{
      position: "relative",
      color: "primary.contrastText",
      "&::before":{
        content: '""',
        width: "100%",
        height: "30%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvnet: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode]
      }
    }}>
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{width:"100%",height:"max-content"}}
        autoplay={{
          delay:3000,
          disableOnInteraction: false
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box sx={{
              paddingTop: {
                xs: "130%",
                sm: "80%",
                md: "60%",
                lg: "45%"
              },
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})`,

            }}>

            </Box>
          </SwiperSlide>
        ))}

      </Swiper>
    </Box>
  );
};

export default HeroSlide;