import React, { useState } from 'react';
import './SignUp.scss';
import axios from 'axios';
import TextInput from '../Shared/TextInput';
import config from '../../../utils/config';

export default props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    let postData = {
      username,
      password,
      password2,
      email
    };

    try {
      const response = await axios.post(`${config.API_URL}/users/signup`, postData);

      if (response.data.msg === 'Success - user created!') {
        setErrors('Woohoo! user created ^_^');
        setTimeout(() => (window.location.href = '/'), 1000);
      }
    } catch (error) {
      if (error.response.status === 409) {
        let newErrorsArr = error.response.data.errors.map(error => error.msg);
        let newErrorsString = newErrorsArr.join('\n');
        setErrors(newErrorsString);
      }
    }
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = e => {
    setPassword2(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="signup-tbl">
          <TextInput
            label="Username"
            placeholder="Username"
            onChange={handleUsernameChange}
            value={username}
            name="username"
          />
          <TextInput
            label="Email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
            name="email"
            inputType="email"
          />
          <TextInput
            label="Password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            inputType="password"
          />
          <TextInput
            label="Password Confirm"
            placeholder="Password Confirmation"
            onChange={handlePassword2Change}
            value={password}
            name="password"
            inputType="password"
          />

          <button type="submit" className="submit-btn">
            Sign up
          </button>
        </div>

        <div className="error-div">{errors}</div>
      </form>
    </div>
  );
};
