import React from "react";
import Form from "../Form/Form";
import FileUpload from "../Form/FileUpload";
import LiveForm from "../LiveForm/LiveForm";
import DatePicker from "../Form/DatePicker";

/**
 * Form page interface
 * @returns Div element containing the entire form functionality
 */
export default function FormPage(props) {
  const [userData, setUserData] = React.useState({});
  const [formMetadata, setFormMetadata] = React.useState(null);
  const [openFileUpload, setOpenFileUpload] = React.useState(false);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const rawFormMetadata = React.useRef(null);
  const localStorageKey = React.useRef("confo-form-");

  const handleClose = (value) =>{
    setOpenDatePicker(false);
  }
  /**
   * Fetch form metadata
   */
  const fetchFormMetadata = async () => {
    const response = await fetch(
      "http://localhost:5000/api/form/metadata/" + props.match.params.id
    );
    const data = await response.json();
    rawFormMetadata.current = data;
  };

  /**
   * Set localstorage key which will be used to access saved data unique to this form
   */
  const setLocalStorageKey = () => {
    localStorageKey.current += rawFormMetadata.current.id;
  };

  /**
   * Prefill values in the form if they already exist
   */
  const prefillInputWithExistingData = () => {
    const existingData = JSON.parse(localStorage.getItem(localStorageKey));
    rawFormMetadata.current.questions.forEach((field) => {
      if (existingData && existingData.hasOwnProperty(field["name"])) {
        if (field.tag === "fieldset") {
          existingData[field["name"]].forEach((checkedIndex) => {
            field.children[checkedIndex]["checked"] = "checked";
          });
        } else field["value"] = existingData[field["name"]];
      }
    });
  };

  /**
   * Provide user an option to review responses before automatically submitting the form
   */
  const addSubmitOption = () => {
    const submitOption = {
      tag: "fieldset",
      "cf-questions":
        "I confirm that all my responses are accurate to the best of my knowledge.",
      name: "submit",
      children: [
        {
          tag: "input",
          type: "radio",
          "cf-label": "Confirm",
          value: "confirm",
        },
      ],
    };
    rawFormMetadata.current.questions.push(submitOption);
  };

  /**
   * Apply operations on raw metadata to generate localstorage key and prefill form with existing data
   */
  const processRawData = () => {
    setLocalStorageKey();
    prefillInputWithExistingData();
    addSubmitOption();
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

  /**
   * Validate phone number input
   * @param {Number} tel
   * @returns Boolean : Whether phone number is valid or not
   */
  const isValidPhoneNumber = (tel) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(Number(tel));
  };

  /**
   * Function to check if the given input is valid or not. Maps the different types of inputs to different validation functions
   * @param {(string | Number)} dto
   * @returns Boolean : Whether input is valid or not
   */
  const isInputValid = (dto) => {
    if (dto.tag.type === "email") return isValidEmail(dto.text);
    if (dto.tag.type === "tel") return isValidPhoneNumber(dto.text);
    // TODO: verify min and max of type number
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
   * Helper function to get the fields checked in radio/checkbox input
   * @param {Object} dto Information about input field and value
   * @returns {Array} Array of checked fields
   */
  const getCheckedFields = (dto) => {
    const elements = dto.controlElements;
    const checkedFields = [];
    elements.forEach((element, index) => {
      if (element.checked) checkedFields.push(index);
    });
    return checkedFields;
  };

  /**
   * Save information for radio/checkbox input
   * @param {Object} dto Information about input field and value
   */
  const saveGroupInfo = (dto) => {
    const existingData = JSON.parse(localStorage.getItem(localStorageKey));
    const checkedFields = getCheckedFields(dto);
    const newData = { [dto.tag.name]: checkedFields };
    const finalData = Object.assign(existingData ? existingData : {}, newData);
    localStorage.setItem(localStorageKey, JSON.stringify(finalData));
  };

  /**
   * Update the live form with the data input by the user and save it in local storage
   * @param {string} tagName Tag name for which data is received
   * @param {(string | Number)} inputData Value entered by user
   */
  const handleInput = (tagName, inputData) => {
    addToState(tagName, inputData);
    saveInfo(tagName, inputData);
  };

  /**
   * Handle input for radio and checkbox
   * @param {Object} dto Information about input field and value
   */
  const handleGroupInput = (dto) => {
    addToState(dto.tag.name, dto.text);
    saveGroupInfo(dto);
  };

  /**
   * Callback when user submits a field
   * @param {Object} dto Contains the information about input field and value
   * @param {Function} success Callback function for success
   * @param {Function} error Callback function for failure
   * @returns Success or Error
   */
  const flowStepCallback = (dto, success, error) => {
    if (dto.tag.type === "group") {
      handleGroupInput(dto);
      return success();
    } else if (isInputValid(dto)) {
      handleInput(dto.tag.name, dto.text);
      return success();
    } else return error();
  };

  return (
    <div>
      {formMetadata && (
        <div>
          <LiveForm userData={userData} metadata={formMetadata} />
          <Form
            userData={userData}
            questions={formMetadata.questions}
            flowStepCallback={flowStepCallback}
            chatTheme={formMetadata.chatTheme}
            formId={props.match.params.id}
            handleFileUpload={() => setOpenFileUpload(true)}
            handleDatePicker={() => setOpenDatePicker(true)}

          />
          <DatePicker open={openDatePicker} onClose={handleClose} />
          <FileUpload open={openFileUpload} />
        </div>
      )}
    </div>
  );
}
