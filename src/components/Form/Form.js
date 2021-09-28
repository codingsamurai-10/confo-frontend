import React from "react";
import {
  ConversationalForm,
  EventDispatcher,
  FlowEvents,
} from "conversational-form";
import MicrophoneInputConfig from "./MicrophoneInputConfig";
import axios from "axios";
import { DatePicker } from "@material-ui/pickers";

/**
 * Conversational form interface
 */
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.submitCallback = this.submitCallback.bind(this);
    this.initializeForm = this.initializeForm.bind(this);
  }

  /**
   * Function called when the form is submitted
   * Gives a response to the user
   */
  submitCallback() {
    this.cf.addRobotChatResponse("Thank you for filling out the form!");
    const userData = this.props.userData;
    userData.formId = this.props.formId;
    axios.post("http://localhost:5000/api/form/response", userData);
  }

  /**
   * Initialize the form and add it to DOM
   */
  initializeForm() {
    var dispatcher = new EventDispatcher();
    const fileUpload = this.props.handleFileUpload;
    const datePicker = this.props.handleDatePicker;
    dispatcher.addEventListener(
      FlowEvents.FLOW_UPDATE,
      function (event) {
        if (event.detail.tag.type === "text") {
          datePicker();
        }
        if (event.detail.tag.type === "file") {
          fileUpload();
        }
      },
      false
    );
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        flowStepCallback: this.props.flowStepCallback,
        microphoneInput: MicrophoneInputConfig,
        theme: this.props.chatTheme.toLowerCase(),
        showProgressBar: true,
        eventDispatcher: dispatcher,
      },
      tags: this.props.questions,
    });
    this.elem.appendChild(this.cf.el);
  }

  componentDidMount() {
    this.initializeForm();
  }

  render() {
    return <div ref={(ref) => (this.elem = ref)} className="form-container" />;
  }
}
export default Form;
