import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import LoadingSpinner from '../components/LoadingSpinner'

function StudentHome() {
    const [teachers, setTeachers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchTeachers = async() => {
        try{
            setIsLoading(true)
            await axios.get('https://study-time-api.herokuapp.com/teachers/api')
            .then((res) => {
                const data = res.data.data
                setTeachers(data)
            })
            console.log(teachers)
        } catch(err) {
            console.log(err)
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

  return (
    <> {isLoading ? (
        <LoadingSpinner />
    ) : (
        <div>
         {teachers.map((item) => {
            return(
                <div>
                    <h1>Hi i'm {item.firstName}</h1>
                </div>
            )
         })}
        </div>
    )}
    
    </>
  )
}

export default StudentHome