import React from 'react';

export default function Form(props) {

  // ## PROPS COMING IN FROM PARENT App.js
  const {
    values, // values of the form
    submit, // callback function
    change, // callback function
    disabled, // boolean
    errors, // object of errors
  } = props

  // ## FUNCTION WHICH PREVENTS SUBMIT BUTTON FROM RELOADING PAGE 
  // ## INVOKES A CALLBACK FUNCTION CALLED SUBMIT() ON THE PARENT COMPONENT
  const onSubmit = event => {
    event.preventDefault()
    submit() // <--- prop && callback function invoked in App.js(parent component) on the rendered FORM component
  }

  // ## FUNCTION TO HANDLE onChange EVENTS IN THE FORM FIELDS. 
  // ## DESTRUCTURES NAME, VALUE, TYPE, CHECKED FROM THE TARGET OF THE EVENT OBJECT (INPUT)
  // ## IF FORM FIELD TYPE EQUALS CHECKBOX, USE CHECKED, ELSE USE VALUE
  // ## INVOKE CHANGE CALLBACK FUNCTION ON PARENT COMPONENT WITH NAME AND VALUE TO USE
  const onChange = event => {
    const { name, value, type, checked } = event.target
    const valueToUse = type === 'checkbox' ? checked : value
    change(name, valueToUse) // <--- prop && callback function invoked in App.js(parent component) on the rendered FORM component
  }

  return (

    <form onSubmit={onSubmit}>
      <div>
        <h2>ADVANCED FORMS | USER ONBOARDING</h2>

        {/* ERROR MESSAGES FOUND IN SCHEMA FILE TO DISPLAY IF FORM NOT VALID */}
        <h3>{errors.username}</h3>
        <h3>{errors.password}</h3>
        <h3>{errors.email}</h3>
        <h3>{errors.gender}</h3>
        <h3>{errors.role}</h3>
        <h3>{errors.tos}</h3>

        {/* USER NAME INPUT */}
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          placeholder='enter your name'
          name='username'
          value={values.username}
          onChange={onChange}
        />

        {/* PASSWORD INPUT */}
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          placeholder='enter a password'
          name='password'
          value={values.password}
          onChange={onChange}
        />

        {/* EMAIL INPUT */}
        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          placeholder='enter your email'
          name='email'
          value={values.email}
          onChange={onChange}
        />

        {/* ROLE MENU */}
        <label htmlFor='role'>Role: </label>
        <select name='role' value={values.role} onChange={onChange}>
          <option>-- Select your Role --</option>
          <option value='fe'>Frondend Developer</option>
          <option value='be'>Backend Developer</option>
          <option value='ui'>User Interface Designer</option>
          <option value='ux'>User Experience Developer</option>
          <option value='ds'>Data Scientist</option>
          <option value='db'>Database Developer</option>
          <option value='qa'>Quality Assurance Developer</option>
          <option value='pm'>Project Manager</option>
          <option value='ia'>Information Architect</option>
        </select>

        {/* GENDER OPTIONS */}
        <label htmlFor='gender'>Gender: </label>
        <input
          type='radio'
          name='gender'
          value='male'
          checked={values.gender === 'male'}
          onChange={onChange}
        />

        <input
          type='radio'
          name='gender'
          value='female'
          checked={values.gender === 'female'}
          onChange={onChange}
        />

        <input
          type='radio'
          name='gender'
          value='other'
          checked={values.gender === 'other'}
          onChange={onChange}
        />

        {/* TERMS OF SERVICE */}
        <label htmlFor='tos'>Terms of Service: </label>
        <input
          type='checkbox'
          name='tos'
          checked={values.tos}
          onChange={onChange}
        />

      </div>

      <div>
        <button id='btn' disabled={disabled}>Submit</button>
      </div>
    </form>

  );
}

