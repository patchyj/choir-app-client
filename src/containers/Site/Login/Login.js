import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';
import TextInput from '../Shared/TextInput';
import config from '../../../utils/config';

export default props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    let postData = {
      username,
      password
    };

    try {
      const response = await axios.post(`${config.API_URL}/users/login`, postData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('userName', response.data.user.username);
        props.loadUser();
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrors('Incorrect username or password!');
      } else {
        setErrors('Something went wrong...');
      }
    }
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="login-tbl">
          <TextInput
            label="Username"
            placeholder="Username"
            onChange={handleUsernameChange}
            value={username}
            name="username"
          />
          <TextInput
            label="Password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            inputType="password"
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
        </div>

        <div className="error-div">{errors}</div>
      </form>
    </div>
  );
};
