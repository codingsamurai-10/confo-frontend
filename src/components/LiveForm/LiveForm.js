import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      ConFoApp
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    paddingRight: "25%",
    paddingTop: "1%",
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  head: {
    paddingTop: "2%",
    paddingLeft: "2%",
    backgroundColor: theme.palette.background.paper,
    textAlign: "left",
  },
  copyright: {
    marginTop: "2%",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
/**
 * Live form that displays information as user fills it
 * @param {Object} props Properties: questions - Questions in the form, userData - Data filled by user
 * @returns Div element containing questions and user data
 */
export function SimpleMediaQuery() {
  const matches = useMediaQuery("(min-width:600px)");

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
export default function LiveForm(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h4" color="inherit" noWrap>
            ConFo App
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.head}>
        <Typography
          component="h5"
          variant="h5"
          align="left"
          color="secondary"
          gutterBottom
        >
          Your form
        </Typography>
      </div>
      <div className={classes.heroContent}>
        <Container align="left">
          <Paper elevation={3}>
            <Typography variant="h9" align="left" color="primary" gutterBottom>
              <ol type="1">
                {props.questions.map((field, index) => (
                  <li key={index}>
                    <Typography variant="h9" color="primary" gutterBottom>
                      <h3>{field["cf-questions"]}</h3>
                    </Typography>
                    <Typography variant="h9" color="secondary" gutterBottom>
                      <p>
                        {props.userData[field["name"]]
                          ? props.userData[field["name"]]
                          : ""}
                      </p>
                    </Typography>
                  </li>
                ))}
              </ol>
            </Typography>
          </Paper>
        </Container>
      </div>
      <div className={classes.copyright}>
        <Copyright />
      </div>
    </React.Fragment>
  );
}
