import React from "react";
import axios from "axios";

export default function ResponsePage(props) {
  const [responsesList, setresponsesList] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/form/responses/" + props.match.params.id)
      .then((res) => {
        res.data.map((i) => console.log(i));
        setresponsesList(res.data);
      });
  }, []);
  return (
    <div>
      {responsesList &&
        responsesList.map((response) => (
          <ul>
            <li>{response._id}</li>
          </ul>
        ))}
    </div>
  );
}
