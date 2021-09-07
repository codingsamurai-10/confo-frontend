import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { Container, FormControl, InputLabel, makeStyles, Paper, Select, TextField, MenuItem, Button, Input, ButtonGroup } from '@material-ui/core';
//tag = {input, fieldset}
//type = {text, radio, checkbox, email, number, tel}
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    backgroundColor: "#FFF8E5",
    padding: "20px"
  }
}));
const tags = [
  { title: "input" },
  { title: "fieldset" },
]
const types = [
  { title: "text" },
  { title: "checkbox" },
  { title: "email" },
  { title: "number" },
  { title: "tel" },
]
const themes = [
  { title: "black" },
  { title: "blue" },
  { title: "light" },
  { title: "cyan" },

]
const initialValues = {
  chatTheme: "black",
  formFields: [{
    tag: "", //input
    type: "", //text
    name: "", //country
    "cf-questions": "" //what is your country?
  }]
}
function onSubmit(values) {
  alert(JSON.stringify(values, null, 2));
}
const AdminForm = () => {
  const classes = useStyles();
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            <Container align="center" className={classes.container}>
              <Paper className={classes.formControl}>
                <FormControl required>
                  <InputLabel>Theme</InputLabel>
                  <Field as={Select} name="chatTheme" value={values.chatTheme} align="left">{themes.map((theme, index) => (
                    <MenuItem value={theme.title}>{theme.title}</MenuItem>
                  ))}</Field>
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
                            {console.log(values)}
                            <FormControl required className={classes.formControl}>
                              <InputLabel>Tag</InputLabel>
                              <Field as={Select} name={`formFields.${index}.tag`} value={formField.tag} align="left">
                                {tags.map((tag, index) => (
                                  <MenuItem value={tag.title}>{tag.title}</MenuItem>
                                ))}
                              </Field>
                            </FormControl>
                            <FormControl required className={classes.formControl}>
                              <InputLabel>Type</InputLabel>
                              <Field as={Select} name={`formFields.${index}.type`} value={formField.type} align="left">
                                {types.map((type, index) => (
                                  <MenuItem value={type.title}>{type.title}</MenuItem>
                                ))}
                              </Field>
                            </FormControl>
                            <FormControl required >
                              <Field as={TextField} className={classes.formControl} required name={`formFields.${index}.["cf-questions"]`} label="Enter your Question" variant="outlined" align="left"></Field>
                            </FormControl>
                            {formField.tag && formField.tag === 'fieldset' &&
                              (<>
                                <Button variant="outlined" className={classes.formControl} onClick={() => {
                                  let newObject = JSON.parse(JSON.stringify(formField)); //TODO: simplify this
                                  replace(index, Object.assign({ children: [{ "cf-label": "" }] }, newObject));
                                }}>Confirm MultiSelect Field</Button>
                                {formField.hasOwnProperty('children') && formField.children.map((child, childIndex) =>
                                (
                                  <FieldArray name={`formFields.${index}.children`}>
                                    {({ insert, remove }) => (
                                      <>
                                        <FormControl required className={classes.formControl}>
                                          <Field as={TextField} required label="Option Label" variant="outlined" name={`formFields.${index}.children.${childIndex}.option`}>
                                            {console.log(child)}
                                          </Field>
                                        </FormControl>
                                        <ButtonGroup>
                                          <Button className={classes.formControl} variant="text" color="primary" onClick={() => { insert(childIndex + 1, { "cf-label": "" }) }}>Add Option Label</Button>
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