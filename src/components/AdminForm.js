import React from 'react';
import { Formik, Field, Form, FieldArray, FastField } from 'formik';
import { Container, FormControl, InputLabel, makeStyles, Paper, Select, TextField, MenuItem, Button, Input, ButtonGroup, Typography, Divider } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "auto",
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    },
    padding:"10px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    backgroundColor: "#FFF8E5",
    padding: "20px"
  }
}));
const tags = ['Text Input', 'Phone Number', 'Email', 'Number', 'File Upload', 'Address', 'DateTime', 'Radio', 'Checkbox'];
const themes = ['Black', 'Blue', 'Cyan', 'Green'];
const initialValues = {
  formName: "ConFo Meta",
  chatTheme: "black",
  formFields: [{
    label: "", 
    answerFormat: "",
    name: ""
  }]
}
function onSubmit(values) {
  console.log("Form metadata\n");
  console.log(JSON.stringify(values, null, 2));
}
const AdminForm = () => {
  const classes = useStyles();
  return (
    <div>
    <Typography variant="h3" align="center" gutterBottom={true} color="primary">ConFo Admin Form</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        >
        {({ values}) => (
          <Form>
            <Container align="center" className={classes.container}>
              <FormControl required>
                <FastField as={TextField} variant="outlined" name={`formName`} className={classes.formControl} value={values.formName} align="left" label="Enter Form Name"></FastField>
              </FormControl>
              <Paper className={classes.formControl}>
                <FormControl required>
                  <InputLabel>Theme</InputLabel>
                  <FastField as={Select} name="chatTheme" value={values.chatTheme} align="left">{themes.map((theme, index) => (
                    <MenuItem value={theme}>{theme}</MenuItem>
                  ))}</FastField>
                </FormControl>
              </Paper>
            </Container>
            <FieldArray name="formFields">
              {({ insert, remove, replace }) => (
                <Container align="center" className={classes.container}>
                  {
                    values.formFields && values.formFields.length > 0 ? (
                      values.formFields.map((formField, index) => (
                        <>
                          <Paper className={classes.formControl}>
                            <Typography align="left" color="primary" gutterBottom={true}>Question {index+1}</Typography>
                            <FormControl required className={classes.formControl}>
                              <InputLabel>Answer Type</InputLabel>
                              <FastField as={Select} name={`formFields.${index}.answerFormat`} value={formField.tag} align="left">
                                {tags.map((tag, index) => (
                                  <MenuItem value={tag}>{tag}</MenuItem>
                                ))}
                              </FastField>
                            </FormControl>
                            <FormControl required > 
                              <FastField as={TextField} className={classes.formControl} required name={`formFields.${index}.name`} label="Name of Field" variant="outlined" align="left"></FastField>
                              <FastField as={TextField} className={classes.formControl} required name={`formFields.${index}.label`} label="Enter your Question" variant="outlined" align="left"></FastField>
                            </FormControl>
                            {formField.tag && (formField.tag === 'Radio' || formField.tag === 'Checkbox') &&
                              (<>
                                <Button variant="outlined" className={classes.formControl} onClick={() => {
                                  let newObject = JSON.parse(JSON.stringify(formField)); //TODO: simplify this
                                  replace(index, Object.assign({ children: [{ label: "" }] }, newObject));
                                }}>Confirm MultiSelect Field</Button>
                                {formField.hasOwnProperty('children') && formField.children.map((child, childIndex) =>
                                (
                                  <FieldArray name={`formFields.${index}.children`}>
                                    {({ insert, remove }) => (
                                      <>
                                        <FormControl required className={classes.formControl}>
                                          <FastField as={TextField} required label="Option Label" variant="outlined" name={`formFields.${index}.children.${childIndex}.label`}>
                                          </FastField>
                                        </FormControl>
                                        
                                        <ButtonGroup>
                                          <Button className={classes.formControl} variant="text" color="primary" onClick={() => { insert(childIndex + 1, { label: "" }) }}>Add Option Label</Button>
                                          <Button className={classes.formControl} variant="text" color="secondary" onClick={() => remove(childIndex)}>Remove Option Label</Button>
                                        </ButtonGroup>
                                      </>
                                    )}
                                  </FieldArray>
                                ))
                                }
                              </>
                              )
                            }
                            <Divider/>
                            <ButtonGroup>
                              <Button className={classes.formControl} variant="contained" color="primary" onClick={() => { insert(index + 1, initialValues.formFields[0]) }}>Add Question Field</Button>
                              <Button className={classes.formControl} variant="contained" color="secondary" onClick={() => remove(index)}>Remove this Field</Button>
                            </ButtonGroup>
                          </Paper>
                        </>
                      ))) : (
                      <Paper>
                        <Button className={classes.formControl} variant="contained" color="primary" onClick={() => insert(0, initialValues)}>Add a Field</Button>
                      </Paper>
                    )
                  }
                </Container>
              )}
            </FieldArray>
            <Container align="right">
              <Button className={classes.formControl} align="center" type="submit" variant="contained">submit</Button>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );

}
export default AdminForm;