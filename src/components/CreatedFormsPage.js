import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function CreatedFormsPage() {
  const [formsList, setFormsList] = React.useState(null);
  React.useEffect(() => {
    axios.get("http://localhost:5000/api/form/getall").then((res) => {
      setFormsList(res.data);
    });
  }, []);
  return (
    <div>
      <h2>Your forms</h2>
      <ul>
        {formsList &&
          formsList.map((form) => (
            <li component={Link} to={`/${form._id}`}>
              {form.formName}
            </li>
          ))}
      </ul>
    </div>
  );
}
