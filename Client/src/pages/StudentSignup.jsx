import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components'

function StudentSignup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            //await axios.post('')
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <main>
        <SForm onSubmit={handleSubmit}>
            <label htmlFor="firstName">First name : </label>
            <input
                type='text'
                id='firstName'
                name='firstName'
                value={firstName}
                
                onChange={(e) => setFirstName(e.target.value)}
                 />
            <label htmlFor="lastName">Last name : </label>
            <input
                type='text'
                id='lastName'
                name='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                 />
            <label htmlFor="email">Email : </label>
            <input
                type='text'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
            <label htmlFor="password">Password : </label>
            <input
                type='text'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 />
                 <button
                    variant='primary'
                    type="submit"
                    onClick={handleSubmit}
                 >
                    Signup
                 </button>
        </SForm>
    </main>
  )
}

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 12rem;
    margin-left: 2rem;
    margin-top: 1rem;
`

export default StudentSignup


