import { Flex } from "@mantine/core"
import React, { useEffect, useState } from "react"
import "./Login.css"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../services/service"
import { useNavigate } from "react-router-dom"


export const Login = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigate = useNavigate()

  const { mutate: login, data, isError, isSuccess } = useMutation({
    mutationKey: ['auth'],
    mutationFn: loginUser
  })

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    }
  }, [isSuccess, data])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if(username && password) {
      login({
        username: username,
        password: password,
      })
      setUsername("")
      setPassword("")
    }
  }

  useEffect(()=>{
    if (isSuccess) {
      navigate("/")
    }
  })
  

  return (
    <Flex className="login">
      <h1 className="login_title">Авторизация</h1>
      <form className="login_form" onSubmit={handleSubmit}>
        <input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username..." 
          className="login_input"
        />
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..." 
          className="login_input"
        />
        <button className="login_btn" type="submit">Вход</button>
      </form>
      { isError && <h1 style={{color: 'red'}}>Неправилно вывод!</h1>  }
    </Flex>
  )
}