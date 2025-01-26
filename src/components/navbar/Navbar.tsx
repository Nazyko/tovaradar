import { Flex, Image } from "@mantine/core"
import Logo from "../../assets/images/navbar/logo.svg"
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
import { useQuery } from "@tanstack/react-query"
import { getMe } from "../../services/service"


export const Navbar = () => {
  const [text, settext] = useState<string>("")

  const dispatch = useAppDispatch();

  const token = localStorage.getItem('accessToken')

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    settext(e.target.value)
    dispatch(searchProducts(text))
  }

  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: () => getMe()
  })

  return (
    <>
      <Flex className="container-sm" align='center' justify='center' mb={20}>
        <Flex w={1220} h={125} align='center' justify="space-between">
          <Link to='/'>
            <Image src={Logo} alt="Logo image"/>
          </Link>

          <Flex align='center' gap={30}>
            <Link to='/search' className={classes.search}>   
              <input value={text} onChange={handleSearch} type="text" className={classes.search_input} placeholder="Я ищу..."/>
              <div className={classes.search_icon}>
                <Image src={Search} alt="Search Icon"/>
              </div>
            </Link>
            
            <Link to={ token ? "/user" : "/login" } className={classes.nav_link_item}>
              <Flex w={40} h={60} direction='column' align='center' justify='flex-end' >
                { token ? <Image src={data?.image} w={26} h={26}/> : <Image src={Login} w={26} h={26}/> }
                { token ? <span>{data?.username}</span> : <span>Войти</span>}
              </Flex>
            </Link>

            <Link to={token ? '/user/orders' : '/login'} className={classes.nav_link_item}>
              <Flex w={50} h={60} direction='column' align='center' justify='flex-end'>
                <Image src={Shop} w={26} h={26}/>
                <span>Заказы</span>
              </Flex>
            </Link>

            <Link to={token ? '/user/likes' : "/login"} className={classes.nav_link_item}>
              <Flex w={75} h={60} direction='column' align='center' justify='flex-end'>
                <Image src={Like} w={26} h={26}/>
                <span>Избранные</span>
              </Flex>
            </Link>

            <Link to="/cart" className={classes.nav_link_item}>
              <Flex w={56} h={60} direction='column' align='center' justify='flex-end'>
                <Image src={Basket} w={26} h={26}/>
                <span>Корзина</span>
              </Flex>
            </Link>
          </Flex>  

        </Flex>
      </Flex> 
    </>
  )
}
