import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <Button component={Link} to='/AdminForm'>Go to Admin</Button>
            <Button component={Link} to='/FormPage'>Go to Form Page</Button>
        </>
    );
}

export default HomePage;