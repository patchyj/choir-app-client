import React from 'react';

const TextAreaInput = ({ label, placeholder, onChange, value, name }) => {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor={name}>
        {label}
      </label>
      <div className="uk-form-controls">
        <textarea
          className="uk-textarea"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          rows={10}
        ></textarea>
      </div>
    </div>
  );
};

export default TextAreaInput;
