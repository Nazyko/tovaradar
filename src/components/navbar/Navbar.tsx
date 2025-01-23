import { Flex, Image } from "@mantine/core"
import Logo from "../../assets/images/navbar/logo.svg"
import Burger from "../../assets/images/navbar/burger.svg"
import Search from "../../assets/images/navbar/search.svg"
import Login from "../../assets/images/navbar/User.svg"
import Shop from "../../assets/images/navbar/shop.svg"
import Like from "../../assets/images/navbar/like.svg"
import Basket from "../../assets/images/navbar/Basket.svg"

import classes from "./Navbar.module.css"
import '@mantine/core/styles.css';
import { Link } from "react-router-dom"
import { ChangeEventHandler, useState } from "react"
import { useAppDispatch } from "../../store/hook"
import { searchProducts } from "../../store/searchSlice"


export const Navbar = () => {
  const [text, settext] = useState<string>("")

  const dispatch = useAppDispatch();

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    settext(e.target.value)
    dispatch(searchProducts(text))
  }

  const token = localStorage.getItem('refreshToken')
  const username = localStorage.getItem('username')


  return (
    <>
      <Flex className="container-sm" align='center' justify='center' mb={20}>
        <Flex h={125} align='center' justify='center' gap={45}>
          <Link to='/'>
            <Image src={Logo} alt="Logo image"/>
          </Link>
          <button className={classes.catalogue_btn}>
            <Flex align='center' justify='center' gap={5}>
              <Image src={Burger}/>
              <span>Каталог</span>
            </Flex>
          </button>
          <Link to='/search' className={classes.search}>   
            <input value={text} onChange={handleSearch} type="text" className={classes.search_input} placeholder="Я ищу..."/>
            <div className={classes.search_icon}>
              <Image src={Search} alt="Search Icon"/>
            </div>
          </Link>
          
          <Link to={ token ? "/user" : "/login" }  className={classes.nav_link_item}>
            <Flex w={40} h={60} direction='column' align='center' justify='flex-end'>
              <Image src={Login} w={26} h={26}/>
              { token ? <span>{username}</span> : <span>Войти</span>}
            </Flex>
          </Link>

          <Link to='/' className={classes.nav_link_item}>
            <Flex w={50} h={60} direction='column' align='center' justify='flex-end'>
              <Image src={Shop} w={26} h={26}/>
              <span>Заказы</span>
            </Flex>
          </Link>

          <Link to='/' className={classes.nav_link_item}>
            <Flex w={75} h={60} direction='column' align='center' justify='flex-end'>
              <Image src={Like} w={26} h={26}/>
              <span>Избранные</span>
            </Flex>
          </Link>

          <Link to={ token ? "/cart" : "/login" } className={classes.nav_link_item}>
            <Flex w={56} h={60} direction='column' align='center' justify='flex-end'>
              <Image src={Basket} w={26} h={26}/>
              <span>Корзина</span>
            </Flex>
          </Link>    
        </Flex>
      </Flex> 
    </>
  )
}
