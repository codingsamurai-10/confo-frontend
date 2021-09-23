import React from "react";
import { ConversationalForm } from "conversational-form";
import MicrophoneInputConfig from "./MicrophoneInputConfig";

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
  }

  /**
   * Initialize the form and add it to DOM
   */
  initializeForm() {
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        flowStepCallback: this.props.flowStepCallback,
        microphoneInput: MicrophoneInputConfig,
        theme: this.props.chatTheme.toLowerCase(),
        showProgressBar: true,
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
