import React from 'react';

const TextInput = ({ label, placeholder, onChange, value, name, inputType = 'text', children }) => {
  return (
    <div className="form-container">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="form-controls">
        <input
          className="form-input"
          type={inputType}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {children}
      </div>
    </div>
  );
};

export default TextInput;
