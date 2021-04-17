import React, { useState, useEffect } from 'react';
import schema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'
import Form from './Form';
import Users from './Users'

// ### INITIAL STATE OF FORM VALUES ###
const initialFormValues = {
  username: '',
  password: '',
  email: '',
  role: '',
  gender: '',
  tos: false
}

// ### INITIAL STATE OF FORM VALIDATION ERRORS ###
// ### Empty strings because user has not interacted with the form or the form has already validated
const initialFormErrors = {
  username: '',
  password: '',
  email: '',
  role: '',
  gender: '',
  tos: ''
}

// ### INITIAL ARRAY OF USERS IS AN EMPTY ARRAY TO HOLD FUTURE LIST OF USERS ###
const initialUsers = []

// ### INITIAL STATE OF THE SUBMIT BUTTON IS A BOOLEAN WHICH INITIALIZES TO TRUE SO THE SUBMIT BUTTON IS DISABLED UNTIL FORM PASSES VALIDATION CHECKS ###
const initialDisabled = true;

// ## APP FUNCTION START ## //
export default function App() {

  // ## Set state for users whos initial state is [initialUsers], an empty array to be populated by future users
  const [users, setUsers] = useState(initialUsers)
  // ## Set state for the form values who initial state is {initialFormValues}, an object of key:value pairs whos values initialize as empty strings and will update in the future
  const [formValues, setFormValues] = useState(initialFormValues)
  // ## Set state for form errors whos initial state is {initialFormErrors}, an object of key:value pairs whos values initialize as empty strings
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  // # Set state for the submit button whos initial state is ?initialDisabled?, a boolean which initializes as true until form passes validation checks
  const [disabled, setDisabled] = useState(initialDisabled)  

  // ## POST NEW USER FUNCTION
  const postNewUser = (newUser) => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(response => {
      setUsers([...users, response.data])
    })
    .catch(error => {
      console.log(`An error has occured`, error)
    })
  }

  // ## UPDATER FUNCTION invokes setFormValues function and takes all the form values and dynamically adds new data
  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues, [name]: value
    })
  }


  // ## FORM VALIDATION
  const validate = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)

    .then(valid => {
      setFormErrors({
        ...formErrors, [name]: ''
      })
    })

    .catch(error => {
      setFormErrors({
        ...formErrors, [name]: error.errors[0]
      })
    })
  }


  // ## 
  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      gender: formValues.gender.trim(),
      tos: formValues.tos
    }
    // ## INVOKE postNewUser passing in the data above
    postNewUser(newUser)
  }


  // ## DISABLE SUBMIT BUTTON UNTIL FORM FIELDS ARE VALID
  useEffect(() => {
    schema.isValid(formValues)
    .then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])


  return (
    <div>
      {/* ## Inject the form component with everything it needs to function properly */}
      <Form values={formValues} errors={formErrors} change={inputChange} submit={formSubmit} disabled={disabled}/>

      {
        users.map((user, index) => {
          return (
            <Users key={index} values={user} />
          )
        })
      }
    </div>
  );
}
