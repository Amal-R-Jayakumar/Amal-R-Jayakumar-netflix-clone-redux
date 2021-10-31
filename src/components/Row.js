import React from "react";
import { Box, Typography, Grid, Modal, CardHeader, Card } from "@mui/material";
import "./Row.css";
import axios from "../axios";
import { makeStyles } from "@mui/styles";

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
});
export default function Row({ title, fetchURL, isLargeRow = false, onImageClick }) {
  const classes = useStyles();
  const [movies, setMovies] = React.useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      // console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

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
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                <div
                  key={movie.id}
                  onClick={() => {
                    setOpen(true);
                    setModalData(movie);
                    console.log(movie);
                  }}
                >
                  <img className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                </div>
              )
          )}
        </div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box className={classes.style}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6" component="h6" style={{ fontWeight: 700 }}>
                    {modalData&&modalData.name}
                  </Typography>
                }
                subheader="September 14, 2016"
              />
            </Card>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
}
