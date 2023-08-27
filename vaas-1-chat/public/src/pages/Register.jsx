import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import '/Users/varadudi/Desktop/vaas/vaas-1-chat/public/src/index.css'
import Logo from '../assests/logo.png'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'

function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'red',
  }
  const handelSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
      const { password, username, email } = values
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      })
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
        return false
      }
      if (data.status === true) {
        toast.success('Created account successfully!!!')
        localStorage.setItem('app-auth-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values
    if (password.length < 8) {
      toast.error('Password length must be greater than 8', toastOptions)
      return false
    } else if (password !== confirmPassword) {
      toast.error(
        'Password and ConfirmPassword Does not match!!!',
        toastOptions,
      )
      return false
    } else if (username.length <= 3) {
      toast.error('Username length must be greater than 3', toastOptions)
      return false
    } else if (email === '') {
      toast.error('Email should not be empty!!!', toastOptions)
      return false
    }
    return true
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handelSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>VAAS</h1>
          </div>
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={(event) => handleChange(event)}
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={(event) => handleChange(event)}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Create user</button>
          <span>
            Already have an account? <StyledLink to="/login">Login</StyledLink>
          </span>
        </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </>
  )
}

const StyledLink = styled(Link)`
  text-decoration: underline red;
  text-underline-offset: 4px;
  color: white;
`
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
    }
  }
  form {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      color: white;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #a50113;
        outline: none;
      }
    }
    button {
      background-color: white;
      color: black;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #272727;
        color: white;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      Link {
        color: white;
      }
    }
  }
`

export default Register
