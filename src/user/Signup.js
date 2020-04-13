import React, { useState } from "react";
import Layout from '../core/Layout';
import {API} from '../config';
import { Link } from "react-router-dom";
import {signup} from '../auth';

const Signup = () =>  {
  const [values, setValues] = useState({
    name: '',
    email: '',
    Password: '',
    error: '',
    success: false,
  })

  const { name, email, password, success, error } = values
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  }

  const clickSubmit = (event) => {
    console.log("I m here");
    event.preventDefault();
    signup({ name, email, password })
    .then(data => {
      console.log("data");
      console.log(data.error);
      if(data.error) {
        setValues({ ...values, error: data.error, success: false })
      }
      else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        });
      }
    });
  };

  const showError = () => (<div className="alert alert-danger" style={{display: error ? '' : 'none'} }>{error}</div>);

  const showSuccess = () => (<div className="alert alert-info" style={{display: success ? '' : 'none'} }> New account is created. Please <Link to='/signin'>Sign In</Link></div>);

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange('name')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange('email')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange('password')}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">Submit</button>

    </form>
  )
    return (
      <Layout title="Sign Up Page"
              description="Sign Up to React E-Commerce App"
              className="contrainer col-md-8 offset-md-2"
      >
        {showSuccess()}
        {showError()}
        {signUpForm()}
        {JSON.stringify(values)}
      </Layout>
    )
};


export default Signup;
