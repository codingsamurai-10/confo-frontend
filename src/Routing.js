import { Fade } from "@material-ui/core";
import { Route, Switch } from "react-router";
import AdminForm from "./components/AdminForm";
import CreatedFormsPage from "./components/CreatedFormsPage";
import FormPage from "./components/FormPage/FormPage";
import HomePage from "./components/HomePage";
import ResponsePage from "./components/ResponsePage";

const Routing = () => {
  return (
    <Fade>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/FormPage/:id" component={FormPage} />
        <Route exact path="/CreatedForms" component={CreatedFormsPage} />
        <Route exact path="/responses/:id" component={ResponsePage} />
        <Route exact path="/AdminForm" component={AdminForm} />
      </Switch>
    </Fade>
  );
};

export default Routing;
