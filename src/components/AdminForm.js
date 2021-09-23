import React from "react";
import * as yup from "yup";
import get from "lodash.get";
import { Formik, Form, FieldArray, FastField, Field } from "formik";
import {
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  TextField,
  MenuItem,
  Button,
  ButtonGroup,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "auto",
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
    padding: "10px",
  },
  formControlNew: {
    display: "block",
    margin: theme.spacing(1),
    minWidth: "auto",
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
    padding: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    backgroundColor: "#FFF8E5",
    padding: "20px",
    fullWidth: "80%",
  },
  questionIndex: {
    display: "inline",
    float: "left",
  },
  optionalSwitch: {
    display: "inline",
    float: "right",
  },
}));
const answerFormats = [
  "text",
  "tel",
  "email",
  "number",
  "file",
  "address",
  "datetime",
  "radio",
  "checkbox",
];
const themes = ["Blue", "Green", "Dark"];
yup.addMethod(yup.array, "unique", function (message, path) {
  return this.test("unique", message, function (list) {
    const mapper = (x) => get(x, path);
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }
    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({ path: `[${idx}].${path}`, message });
  });
});
const validationSchema = yup.object().shape({
  questions: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string(),
      })
    )
    .unique(true, "name"),
});
const initialValues = {
  formName: "ConFo Meta",
  chatTheme: "Blue",
  description: "",
  disableEditResponses: true,
  questions: [
    {
      label: "",
      answerFormat: "",
      name: "",
      optional: false,
      exampleInput: "",
    },
  ],
};
const onSubmit = async (values) => {
  console.log("Form metadata\n");
  const json = JSON.stringify(values, null, 2);
  console.log(json);
  const res = await fetch("http://localhost:5000/api/form/metadata", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });
  console.log(res);
};
const AdminForm = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography
        variant="h3"
        align="center"
        gutterBottom={true}
        color="primary"
      >
        ConFo Admin Form
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Container align="center" className={classes.container}>
              <FormControl required>
                <FastField
                  as={TextField}
                  variant="outlined"
                  name={`formName`}
                  className={classes.formControl}
                  value={values.formName}
                  align="left"
                  label="Enter Form Name"
                />
              </FormControl>
              <FormControl fullWidth>
                <FastField
                  as={TextField}
                  multiline
                  maxRows={4}
                  variant="standard"
                  name={"description"}
                  className={classes.formControl}
                  value={values.description}
                  align="left"
                  label="Enter form description"
                />
              </FormControl>
              <Paper className={classes.formControl}>
                <FormControl>
                  <InputLabel>Edit Form Response </InputLabel>
                  <FastField
                    as={Select}
                    name="disableEditResponses"
                    value={values.disableEditResponses}
                    align="left"
                  >
                    <MenuItem value={false}>{"Enable"}</MenuItem>
                    <MenuItem value={true}>{"Disable"}</MenuItem>
                  </FastField>
                </FormControl>
                <FormControl required>
                  <InputLabel>Theme</InputLabel>
                  <FastField
                    as={Select}
                    name="chatTheme"
                    value={values.chatTheme}
                    align="left"
                  >
                    {themes.map((theme, index) => (
                      <MenuItem value={theme}>{theme}</MenuItem>
                    ))}
                  </FastField>
                </FormControl>
              </Paper>
            </Container>
            <FieldArray name="questions">
              {({ insert, remove, replace }) => (
                <Container align="center" className={classes.container}>
                  {values.questions && values.questions.length > 0 ? (
                    values.questions.map((formField, index) => (
                      <>
                        <Paper className={classes.formControl}>
                          <Typography
                            className={classes.questionIndex}
                            align="left"
                            color="primary"
                            gutterBottom={true}
                          >
                            Question {index + 1}
                          </Typography>
                          <FormControlLabel
                            control={
                              <FastField
                                as={Switch}
                                checked={formField.optional}
                                name={`questions.${index}.optional`}
                              ></FastField>
                            }
                            className={classes.optionalSwitch}
                            label="Optional"
                          ></FormControlLabel>
                          <FormControl required className={classes.formControl}>
                            <InputLabel>Answer Type</InputLabel>
                            <FastField
                              as={Select}
                              defaultValue=""
                              name={`questions.${index}.answerFormat`}
                              value={formField.tag}
                              align="left"
                            >
                              {answerFormats.map((answerFormat, index) => (
                                <MenuItem value={answerFormat}>
                                  {answerFormat}
                                </MenuItem>
                              ))}
                            </FastField>
                          </FormControl>
                          <FormControl>
                            <Field
                              as={TextField}
                              className={classes.formControl}
                              error={
                                touched.questions &&
                                touched.questions[index] &&
                                touched.questions[index].name &&
                                errors[index] &&
                                errors[index].name
                              }
                              helperText={errors[index] ? "Not unique" : ""}
                              required
                              name={`questions.${index}.name`}
                              label="Name of Field"
                              variant="outlined"
                              align="left"
                            ></Field>
                            <FastField
                              as={TextField}
                              className={classes.formControl}
                              required
                              name={`questions.${index}.label`}
                              label="Enter your Question"
                              variant="outlined"
                              align="left"
                            ></FastField>
                            <FastField
                              as={TextField}
                              className={classes.formControl}
                              name={`questions.${index}.exampleInput`}
                              label="Example Input"
                              variant="outlined"
                              align="left"
                            ></FastField>
                          </FormControl>
                          {(formField.answerFormat &&
                            (formField.answerFormat === "Radio" ||
                              formField.answerFormat === "Checkbox") && (
                              <>
                                <Button
                                  variant="outlined"
                                  className={classes.formControlNew}
                                  onClick={() => {
                                    let newObject = JSON.parse(
                                      JSON.stringify(formField)
                                    );
                                    replace(
                                      index,
                                      Object.assign(
                                        { valueOptions: [""] },
                                        newObject
                                      )
                                    );
                                  }}
                                >
                                  Confirm MultiSelect Field
                                </Button>
                                {formField.hasOwnProperty("valueOptions") &&
                                  formField.valueOptions.map(
                                    (child, childIndex) => (
                                      <FieldArray
                                        name={`questions.${index}.valueOptions`}
                                      >
                                        {({ insert, remove }) => (
                                          <>
                                            <FormControl
                                              required
                                              className={classes.formControl}
                                            >
                                              <FastField
                                                as={TextField}
                                                required
                                                label="Option Label"
                                                variant="outlined"
                                                name={`questions.${index}.valueOptions.${childIndex}`}
                                              ></FastField>
                                            </FormControl>
                                            <ButtonGroup>
                                              <Button
                                                className={classes.formControl}
                                                variant="text"
                                                color="primary"
                                                onClick={() => {
                                                  insert(childIndex + 1, "");
                                                }}
                                              >
                                                Add Option Label
                                              </Button>
                                              <Button
                                                className={classes.formControl}
                                                variant="text"
                                                color="secondary"
                                                onClick={() =>
                                                  remove(childIndex)
                                                }
                                              >
                                                Remove Option Label
                                              </Button>
                                            </ButtonGroup>
                                          </>
                                        )}
                                      </FieldArray>
                                    )
                                  )}
                              </>
                            )) ||
                            ((formField.answerFormat === "Phone Number" ||
                              formField.answerFormat === "Email") && (
                              <>
                                <Button
                                  variant="outlined"
                                  className={classes.formControlNew}
                                  onClick={() => {
                                    let newObject = JSON.parse(
                                      JSON.stringify(formField)
                                    );
                                    replace(
                                      index,
                                      Object.assign(
                                        { validateByOtp: false },
                                        newObject
                                      )
                                    );
                                  }}
                                >
                                  Confirm Answer Type
                                </Button>
                                {formField.hasOwnProperty("validateByOtp") && (
                                  <FormControlLabel
                                    control={
                                      <FastField
                                        as={Switch}
                                        checked={formField.validateByOtp}
                                        name={`questions.${index}.validateByOtp`}
                                      />
                                    }
                                    className={classes.formControl}
                                    label="Validate by OTP"
                                  />
                                )}
                              </>
                            )) ||
                            (formField.answerFormat === "DateTime" && (
                              <>
                                <Button
                                  variant="outlined"
                                  className={classes.formControlNew}
                                  onClick={() => {
                                    let newObject = JSON.parse(
                                      JSON.stringify(formField)
                                    );
                                    replace(
                                      index,
                                      Object.assign(
                                        {
                                          dateRange: ["", ""],
                                          timeRange: ["", ""],
                                        },
                                        newObject
                                      )
                                    );
                                  }}
                                >
                                  Confirm Answer Type{" "}
                                </Button>
                                {formField.hasOwnProperty("dateRange") && (
                                  <>
                                    <Field
                                      as={TextField}
                                      label="Min Date"
                                      name={`questions.${index}.dateRange[0]`}
                                      value={formField.dateRange[0]}
                                      type="date"
                                      className={classes.formControl}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                      as={TextField}
                                      error={
                                        Date.parse(formField.dateRange[1]) -
                                          Date.parse(formField.dateRange[0]) <
                                        0
                                      }
                                      helperText={
                                        Date.parse(formField.dateRange[1]) -
                                          Date.parse(formField.dateRange[0]) <
                                        0
                                          ? "Enter Max Date greater than Min Date"
                                          : ""
                                      }
                                      label="Max Date"
                                      name={`questions.${index}.dateRange[1]`}
                                      value={formField.dateRange[1]}
                                      type="date"
                                      className={classes.formControl}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                      as={TextField}
                                      label="Min Time"
                                      name={`questions.${index}.timeRange[0]`}
                                      value={formField.timeRange[0]}
                                      type="time"
                                      className={classes.formControl}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                      as={TextField}
                                      error={
                                        formField.timeRange[1] <
                                        formField.timeRange[0]
                                      }
                                      helperText={
                                        formField.timeRange[1] <
                                        formField.timeRange[0]
                                          ? "Enter Max Time greater than Min Time"
                                          : ""
                                      }
                                      label="Max Time"
                                      name={`questions.${index}.timeRange[1]`}
                                      value={formField.timeRange[1]}
                                      type="time"
                                      className={classes.formControl}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  </>
                                )}
                              </>
                            )) ||
                            (formField.answerFormat === "Number" && (
                              <>
                                <Button
                                  variant="outlined"
                                  className={classes.formControlNew}
                                  onClick={() => {
                                    let newObject = JSON.parse(
                                      JSON.stringify(formField)
                                    );
                                    replace(
                                      index,
                                      Object.assign(
                                        { numberRange: [0, 0] },
                                        newObject
                                      )
                                    );
                                  }}
                                >
                                  Confirm Answer Type{" "}
                                </Button>
                                {formField.hasOwnProperty("numberRange") && (
                                  <>
                                    <Field
                                      as={TextField}
                                      required
                                      label="Min Input"
                                      name={`questions.${index}.numberRange[0]`}
                                      value={formField.numberRange[0]}
                                      type="number"
                                      className={classes.formControl}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                      as={TextField}
                                      required
                                      label="Max Input"
                                      error={
                                        formField.numberRange[1] <
                                        formField.numberRange[0]
                                      }
                                      helperText={
                                        formField.numberRange[1] <
                                        formField.numberRange[0]
                                          ? "Enter Max Input greater than Min Input"
                                          : ""
                                      }
                                      name={`questions.${index}.numberRange[1]`}
                                      value={formField.numberRange[1]}
                                      type="number"
                                      className={classes.formControl}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  </>
                                )}
                              </>
                            ))}
                          <Divider />
                          <ButtonGroup>
                            <Button
                              className={classes.formControl}
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                insert(index + 1, initialValues.questions[0]);
                              }}
                            >
                              Add Question Field
                            </Button>
                            <Button
                              className={classes.formControl}
                              variant="contained"
                              color="secondary"
                              onClick={() => remove(index)}
                            >
                              Remove this Field
                            </Button>
                          </ButtonGroup>
                        </Paper>
                      </>
                    ))
                  ) : (
                    <Paper>
                      <Button
                        className={classes.formControl}
                        variant="contained"
                        color="primary"
                        onClick={() => insert(0, initialValues)}
                      >
                        Add a Field
                      </Button>
                    </Paper>
                  )}
                </Container>
              )}
            </FieldArray>
            <Container align="right">
              <Button
                className={classes.formControl}
                align="center"
                type="submit"
                variant="contained"
              >
                submit
              </Button>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AdminForm;
