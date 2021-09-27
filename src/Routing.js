import { Fade } from "@material-ui/core";
import { Route, Switch } from "react-router";
import AdminForm from "./components/AdminForm";
import FormPage from "./components/FormPage/FormPage";
import HomePage from "./components/HomePage";

const Routing = () => {
  return (
    <Fade>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/FormPage/:id" component={FormPage} />
        <Route exact path="/AdminForm" component={AdminForm} />
      </Switch>
    </Fade>
  );
};

export default Routing;
