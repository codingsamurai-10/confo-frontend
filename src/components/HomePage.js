import { Grid, Paper, Typography, Card, CardHeader, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#00A19D",
    textDecoration: "none"
  },
  title: {
    backgroundColor: "#FFB344",
  },
  container: {
    backgroundColor: "#FFF8E5"
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
const HomePage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} align='center'>
      <Paper className={classes.title}><Typography variant="h3" gutterBottom elevation={5}>
        Welcome to ConFo App
        </Typography>
      </Paper>
      <Grid container className={classes.root} spacing={2} justifyContent="center">
        <Grid item>
          <Paper elevation={5}>
            <Card className={classes.card} component={Link} to={'/AdminForm'}>
              <CardHeader className={classes.card}
                title="Go to Admin Page"
                subheader="Make your own ConFo Chat i nterface"
              />
            </Card>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={5}>
            <Card className={classes.card} component={Link} to={'/FormPage'}>
              <CardHeader
                className={classes.card}
                title="Go to FormPage"
                subheader="See your ConFo interface in Action"
              />
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;