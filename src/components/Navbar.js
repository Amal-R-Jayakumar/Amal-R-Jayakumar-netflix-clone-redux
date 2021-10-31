import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, IconButton, Avatar, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
// import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles({
  nav: {
    width: "100%",
    zIndex: 100,
    transitionTimingFunction: "ease-in",
    transition: "all 0.5s",
  },
  nav__transparent: {
    background: "transparent",
  },
  nav__black: {
    backgroundColor: "rgb(17, 17, 17, 87%)",
  },
  nav__logo: {
    position: "fixed",
    top: "10px",
    left: "20px",
    width: "150px",
    cursor: "pointer",
    objectFit: "contain",
  },
  nav__avatar: {
    cursor: "pointer",
    position: "fixed",
    width: "30px",
    height: "30px",
  },
});

function Navbar() {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const trasnparentNavChange = () => {
    window.scrollY > 100 ? setShow(true) : setShow(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", trasnparentNavChange);
    return () => {
      window.removeEventListener("scroll", trasnparentNavChange);
    };
  }, []);
  return (
    // <div className={clsx(classes.nav)}>
    <Box sx={{ flexGrow: 1 }} className={clsx(classes.nav)}>
      <AppBar position="fixed" elevation={show ? 3 : 0} style={{ background: show ? "#111" : "transparent" }}>
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <img className={classes.nav__logo} src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png" alt="" />
            </IconButton>
            <Avatar className={classes.nav__avatar} alt="Remy Sharp" src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" />
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    // </div>
  );
}

export default Navbar;
