const mediaType = {
  movie:'movie',
  tb:'tv'
};

const mediaCategory = {
  popular:'popular',
  top_rated:'top_rated'
};

const backdropPath = imgEndPoint => `https://image.tmbd.org/t/p/original${imgEndPoint}`;

const posterPath = imgEndPoint => `https://image.tmbd.org/t/p/w500${imgEndPoint}`;

const youtubePath = videoId => `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmbdConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
}

export default tmbdConfigs;