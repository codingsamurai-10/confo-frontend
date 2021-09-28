import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Dialog } from "@material-ui/core";

const DatePickerComponent = (props) => {
	const [date, changeDate] = useState(new Date());
  props.handleDate(date);
	// prettier-ignore
	return (
    <Dialog open={props.open} onClose={props.onClose} > <MuiPickersUtilsProvider utils={DateFnsUtils}> <DatePicker
        autoOk
        variant="static"
        openTo="year"
        value={date}
        onChange={changeDate}
      /></MuiPickersUtilsProvider></Dialog>
    

  );
};

export default DatePickerComponent;
