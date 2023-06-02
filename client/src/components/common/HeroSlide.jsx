import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {Box, Button, Chip, Divider, stack, Typography, useTheme, Stack} from "@mui/material";
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
        page:1
      });

      // console.log( mediaType,mediaCategory ); 
      // console.log(response.results); api 점검용

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
        pointerEvnets: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode] // 수직방향 그라데이션
      }
    }}>
      <Swiper
        grabCursor={true}
        loop={true}
        // modules={[Autoplay]}
        style={{width:"100%",height:"max-content"}}
        // autoplay={{
        //   delay:3000,
        //   disableOnInteraction: false
        // }}
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

            }}/>
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
            }}/>
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              paddingX: {sm: "10px", md: "5rem", lg: "10rem"} 
            }}>
              <Box sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingX: "1.875rem",
                color: "text.primary",
                width: {sm: "unset", md: "30%", lg: "40%"}
              }}> 
                <Stack spacing={4} direction="column">
                  {/* title */}
                    <Typography
                      variant="h4"
                      fontSize={{xs: "2rem", md: "2rem", lg:"4rem"}}
                      fontWeight="700"
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left")
                      }}
                    >
                      {movie.title || movie.name}
                    </Typography>
                  {/* title */}

                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rating */}
                    <CircularRate value={movie.vote_average}/>
                    {/* rating */}

                    <Divider orientation="vertical"/>
                    {/* genre */}
                      {[...movie.genre_ids].splice(0,2).map((genreId,index)=>(
                        <Chip
                          variant="filled"
                          color="primary"
                          key={index}
                          label={genres.find(e => e.id === genreId) && genres.find(e => e.id === genreId).name}
                        />
                      ))}
                    {/* genre */}
                  </Stack>

                  {/* overview */}
                  <Typography variant="body1" sx={{
                    ...uiConfigs.style.typoLines(3)
                  }}>
                    {movie.overview}
                  </Typography>
                  {/* overview */}
                  
                  {/* button */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon/>}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType,movie.id)}
                    sx={{ width: "max-content"}}
                  >
                    watch now!  
                  </Button>
                  {/* button */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}

      </Swiper>
    </Box>
  );
};

export default HeroSlide;