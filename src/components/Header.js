import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
    },
  },
}));
function Header() {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Pokemon Website
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/login" className={classes.link}>
              Login / Register
            </Link>
            <Link to="/" className={classes.link}>
              Pokedex
            </Link>
            <Link to="/dashboard" className={classes.link}>
              Dashboard
            </Link>
            <Link to="/catch" className={classes.link}>
              Safari Zone
            </Link>
            
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Header;