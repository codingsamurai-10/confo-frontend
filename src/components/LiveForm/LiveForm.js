import React from "react";

export default function LiveForm(props) {
  return (
    <div>
      <h1>Fill the form</h1>
      <ul>
        {props.formFields.map((field, index) => (
          <li key={index}>
            <h3>{field["cf-questions"]}</h3>
            <p>
              {props.userData.hasOwnProperty(field["name"])
                ? props.userData[field["name"]]
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
