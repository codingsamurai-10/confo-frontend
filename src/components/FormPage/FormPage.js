import React from "react";
import Form from "../Form/Form";
import LiveForm from "../LiveForm/LiveForm";

/**
 * Form page interface
 * @returns Div element containing the entire form functionality
 */
export default function FormPage() {
  const [userData, setUserData] = React.useState({});

  const chatTheme = "blue";
  const formFields = [
    {
      tag: "input",
      type: "text",
      name: "firstname",
      "cf-questions": "What is your firstname?",
    },
    {
      tag: "input",
      type: "text",
      name: "lastname",
      "cf-questions": "What is your lastname?",
    },
    {
      tag: "input",
      type: "text",
      name: "age",
      "cf-questions": "What is your age?",
    },
  ];

  /**
   * Update the live form with the data input by the user
   * @param {string} tagName Tag name for which data is received
   * @param {(string | number)} inputData Value entered by user
   */
  const changeState = async (tagName, inputData) => {
    const temp = { [tagName]: inputData };
    setUserData({ ...userData, ...temp });
    setUserData(Object.assign(userData, temp)); // haxx
  };

  /**
   * Callback when user submits a field
   * @param {Object} dto Contains the information about input field and value
   * @param {Function} success Callback function for success
   * @param {Function} error Callback function for failure
   * @returns Success or Error
   */
  const flowStepCallback = (dto, success, error) => {
    // TODO validate data
    changeState(dto.tag.name, dto.text);
    return success();
  };

  return (
    <div>
      <LiveForm userData={userData} formFields={formFields} />
      <Form
        formFields={formFields}
        flowStepCallback={(a, b, c) => flowStepCallback(a, b, c)}
        chatTheme={chatTheme}
      />
    </div>
  );
}
