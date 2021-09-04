import React from "react";
import Form from "../Form/Form";
import LiveForm from "../LiveForm/LiveForm";

export default function FormPage() {
  const [userData, setUserData] = React.useState({});

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

  const changeState = async (tagName, inputData) => {
    const temp = { [tagName]: inputData };
    setUserData({ ...userData, ...temp });
    setUserData(Object.assign(userData, temp)); // haxx
  };

  const flowStepCallback = (dto, success, error) => {
    changeState(dto.tag.name, dto.text);
    return success();
  };

  return (
    <div>
      <LiveForm userData={userData} formFields={formFields} />
      <Form
        formFields={formFields}
        flowStepCallback={(a, b, c) => flowStepCallback(a, b, c)}
      />
    </div>
  );
}
