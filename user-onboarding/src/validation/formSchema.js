// ## IMPORT ALL NAMED EXPORTS FROM YUP AS YUP
import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must be 3 characters or longer'),
  password: yup.string().required('Password is required').min(6, 'Password must be 6 characters or longer'),
  email: yup.string().required('A valid email is required').strict(),
  role: yup.string().oneOf(['fe', 'be', 'ui', 'ux', 'ds', 'db', 'qa', 'pm', 'ia'], 'A role is required'),
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Please select a gender'),
  tos: yup.boolean([]).oneOf([true], 'Must accept terms of service')
})