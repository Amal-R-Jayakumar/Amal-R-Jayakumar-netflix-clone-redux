import React from "react";
import { Box, Typography, Grid, Modal, CardHeader, Card, IconButton, CardContent, CardMedia } from "@mui/material";
import "./Row.css";
import axios from "../axios";
import { makeStyles } from "@mui/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import { API_KEY } from "../Request";

const useStyles = makeStyles({
  row: {
    color: "#ffffff",
    paddingLeft: "20px",
  },
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  movieTitle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "16",
    fontWeight: 300,
  },
});
export default function Row({ title, fetchURL, isLargeRow = false, onImageClick }) {
  const classes = useStyles();
  const [movies, setMovies] = React.useState([]);
  const [movieVideo, setMovieVideo] = React.useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [open, setOpen] = React.useState(false);
  // const [dataObtained, setDataObtained] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    (async () => {
      await axios.get(fetchURL).then((request) => {
        setMovies(request.data.results);
        // setDataObtained(true);
        // console.log(request.data.results);
      });
    })();
  }, [fetchURL]);

  const movieVideoFn = async (movie) => {
    await axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((request) => {
        setMovieVideo(request.data.results);
        console.log(request.data);
      })
      .catch((error) => {
        setMovieVideo(null);
        console.error(error)});
  };
  // console.log(movies);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box className={classes.row}>
          <Typography variant="h6" component="h6" style={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Box>
        <div className="row__posters">
          {movies &&
            movies.map(
              (movie) =>
                ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                  <div
                    key={movie.id}
                    onClick={() => {
                      setOpen(true);
                      setModalData(movie);
                      // console.log(movie);
                      movieVideoFn(movie);
                    }}
                  >
                    <img className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                    <Typography variant="p" component="p" className={classes.movieTitle}>
                      {movie.name || movie.title}
                    </Typography>
                  </div>
                )
            )}
        </div>
        {modalData && (
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className={classes.style}>
              <Card>
                <CardHeader
                  action={
                    <IconButton onClick={handleClose}>
                      <CancelIcon />
                    </IconButton>
                  }
                  title={
                    <Typography variant="h6" component="h6" style={{ fontWeight: 700 }}>
                      {modalData.name || modalData.title}
                    </Typography>
                  }
                  subheader={`No trailer? blame the TMDB API`}
                />

                {movieVideo.length ? (
                  // <CardMedia component="video" height="600" src={`https://www.youtube.com/embed/${movieVideo.at(-1).key}`} alt="Paella dish" />
                  <iframe width="560" height="315" src={`https://www.youtube.com/embed/${movieVideo.at(-1).key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                ) : (
                  <CardMedia component="img" height="600" image={`${base_url}${modalData.poster_path}`} alt="Paella dish" />
                )}
                {/* {movieVideo.length ? <CardMedia component="video" height="600" src={`https://youtu.be/${movieVideo.at(-1).key}`} alt="Paella dish" /> : <CardMedia component="img" height="600" image={`${base_url}${modalData.poster_path}`} alt="Paella dish" />} */}
              </Card>
            </Box>
          </Modal>
        )}
      </Grid>
    </Grid>
  );
}
