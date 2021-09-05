import React from "react";
import Form from "../Form/Form";
import LiveForm from "../LiveForm/LiveForm";

/**
 * Form page interface
 * @returns Div element containing the entire form functionality
 */
export default function FormPage() {
  const [userData, setUserData] = React.useState({});
  const [formMetadata, setFormMetadata] = React.useState(null);
  const rawFormMetadata = React.useRef(null);
  const localStorageKey = React.useRef("confo-form-");

  /**
   * Fetch form metadata
   */
  const fetchFormMetadata = async () => {
    const response = await fetch("http://localhost:5000/formMetadata");
    const data = await response.json();
    rawFormMetadata.current = data;
  };

  /**
   * Set localstorage key which will be used to access saved data unique to this form
   */
  const setLocalStorageKey = () => {
    localStorageKey.current += rawFormMetadata.current.formID;
  };

  /**
   * Prefill values in the form if they already exist
   */
  const prefillInputWithExistingData = () => {
    const existingData = JSON.parse(localStorage.getItem(localStorageKey));
    rawFormMetadata.current.formFields.forEach((field) => {
      if (existingData && existingData.hasOwnProperty(field["name"])) {
        field["value"] = existingData[field["name"]];
      }
    });
  };

  /**
   * Apply operations on raw metadata to generate localstorage key and prefill form with existing data
   */
  const processRawData = () => {
    setLocalStorageKey();
    prefillInputWithExistingData();
    setFormMetadata(rawFormMetadata.current);
  };

  /**
   * Fetch form metadata from backend and apply operations on it
   */
  const fetchAndProcessFormMetadata = async () => {
    await fetchFormMetadata();
    processRawData();
  };

  React.useEffect(() => {
    fetchAndProcessFormMetadata();
  }, []);

  /**
   * Validate email address input
   * @param {string} email
   * @returns Boolean : Whether email is valid or not
   */
  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPhoneNumber = (tel) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(Number(tel));
  };

  /**
   * Function to check if the given input is valid or not. Maps the different types of inputs to different validation functions
   * @param {(string | number)} dto
   * @returns Boolean : Whether input is valid or not
   */
  const isInputValid = (dto) => {
    if (dto.tag.type === "email") return isValidEmail(dto.text);
    if (dto.tag.type === "tel") return isValidPhoneNumber(dto.text);
    return true;
  };

  /**
   * Make changes in userData state
   * @param {string} tagName Tag name for which data is received
   * @param {string} inputData Value entered by user
   */
  const addToState = (tagName, inputData) => {
    const temp = { [tagName]: inputData };
    setUserData({ ...userData, ...temp });
    setUserData(Object.assign(userData, temp));
  };

  /**
   * Save the info in local storage
   * @param {string} tagName Tag of input field
   * @param {string} inputData Value of input field
   */
  const saveInfo = (tagName, inputData) => {
    const existingData = JSON.parse(localStorage.getItem(localStorageKey));
    const newData = { [tagName]: inputData };
    const finalData = Object.assign(existingData ? existingData : {}, newData);
    localStorage.setItem(localStorageKey, JSON.stringify(finalData));
  };

  /**
   * Update the live form with the data input by the user and save it in local storage
   * @param {string} tagName Tag name for which data is received
   * @param {(string | number)} inputData Value entered by user
   */
  const handleInput = (tagName, inputData) => {
    addToState(tagName, inputData);
    saveInfo(tagName, inputData);
  };

  /**
   * Callback when user submits a field
   * @param {Object} dto Contains the information about input field and value
   * @param {Function} success Callback function for success
   * @param {Function} error Callback function for failure
   * @returns Success or Error
   */
  const flowStepCallback = (dto, success, error) => {
    if (isInputValid(dto)) {
      handleInput(dto.tag.name, dto.text);
      return success();
    } else return error();
  };

  return (
    <div>
      {formMetadata && (
        <div>
          <LiveForm userData={userData} formFields={formMetadata.formFields} />
          <Form
            formFields={formMetadata.formFields}
            flowStepCallback={flowStepCallback}
            chatTheme={formMetadata.chatTheme}
          />
        </div>
      )}
    </div>
  );
}
