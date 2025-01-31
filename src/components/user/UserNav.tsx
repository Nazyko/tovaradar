import { Flex, Image } from "@mantine/core"
import { NavLink, useNavigate } from "react-router-dom"
import UserIcon from "../../assets/images/user/user.svg"
import ListIcon from "../../assets/images/user/list.svg"
import LikeIcon from "../../assets/images/user/like_icon.svg"
import SignInIcon from "../../assets/images/user/sign_in_icon.svg"
import "./UserNav.css"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"


export const UserNav = () => {
  const [isActive] = useState<boolean>(false)
  const { logout, refetch } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    refetch()
    navigate("/")
  }
  
  return (
    <Flex direction='column' gap={20} className="user-nav">  

      <NavLink to="/user/info" className={isActive ? "active" : ""}>
        <Flex gap={10} align='center'>
          <Image w={20} h={20} src={UserIcon}/>
           Личные данные
        </Flex>
      </NavLink>

      <NavLink to="/user/orders" className={isActive ? "active" : ""}>
        <Flex gap={10} align='center'>
          <Image w={20} h={20} src={ListIcon}/>
          Заказы
        </Flex>
      </NavLink> 

      <NavLink to="/user/likes" className={isActive ? "active" : ""}>
        <Flex gap={10} align='center'>
          <Image w={20} h={20} src={LikeIcon}/>
          Избранные
        </Flex>
      </NavLink>

      <button onClick={handleLogout}>
        <Flex gap={10} align='center'>
          <Image w={20} h={20} src={SignInIcon} /> 
          Выход
        </Flex>
      </button>
      
    </Flex>
  )
}

