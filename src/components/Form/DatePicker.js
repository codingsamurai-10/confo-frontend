import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const DatePickerComponent = () => {
	const [date, changeDate] = useState(new Date());

	// prettier-ignore
	return (

     <MuiPickersUtilsProvider utils={DateFnsUtils}> <DatePicker
        autoOk
        variant="static"
        openTo="year"
        value={date}
        onChange={changeDate}
      /></MuiPickersUtilsProvider>

  );
};

export default DatePickerComponent;
