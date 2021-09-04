import React from "react";
import { ConversationalForm } from "conversational-form";
import MicrophoneInputConfig from "./MicrophoneInputConfig";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.submitCallback = this.submitCallback.bind(this);
  }

  submitCallback() {
    this.cf.addRobotChatResponse("Thank you for filling out the form!");
  }

  componentDidMount() {
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        flowStepCallback: this.props.flowStepCallback,
        microphoneInput: MicrophoneInputConfig
      },
      tags: this.props.formFields,
    });
    this.elem.appendChild(this.cf.el);
  }

  render() {
    return <div ref={(ref) => (this.elem = ref)} className="form-container" />;
  }
}
