import React from "react";

/**
 * Live form that displays information as user fills it
 * @param {Object} props Properties: formFields - Questions in the form, userData - Data filled by user
 * @returns Div element containing questions and user data
 */
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
