import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertMessage from "../Layout/AlertMessage"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginRegister({ onLogin }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/admin/login', {
        login_name: data.user_name
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        onLogin(response.data);
        setAlert({ type: 'success', message: 'Logged in successfully!' });
        navigate('/users');
      } else {
        setAlert({ type: 'error', message: response.data.error });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AlertMessage info={alert} />
        <input
          type="text"
          placeholder="User Name"
          {...register("user_name", { required: true })}
        />
        <button type="submit">Login</button>
      </form>
      {errors.user_name && <p>User Name is required</p>}
    </>
  );
}

export default LoginRegister;
