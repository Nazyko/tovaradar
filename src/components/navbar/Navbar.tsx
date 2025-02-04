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
import { ChangeEventHandler, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { searchProducts } from "../../store/searchSlice"
import { useAuth } from "../../hooks/useAuth"


export const Navbar = () => {
  const { isAuth, image, username, refetch } = useAuth()
  const { carts } = useAppSelector(state => state.cart)
  const [text, settext] = useState<string>("")

  useEffect(() => {
    if (isAuth) {
      refetch()
    }
  }, [isAuth, refetch]);

  const dispatch = useAppDispatch();

  const token = localStorage.getItem('accessToken')

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    settext(e.target.value)
    dispatch(searchProducts(text))
  }

  const cart = carts.length > 0 ? carts[0] : null;
  const totalProducts = cart ? cart.totalProducts : 0;

  return (
    <>
      <Flex className="container-sm" align='center' justify='center'>
        <Flex w={1220} h={125} align='center' justify="space-between">

          <Link to='/'>
            <Image src={Logo} alt="Logo image"/>
          </Link>
          
          <Link to='/search' className={classes.search}>   
            <input value={text} onChange={handleSearch} type="text" className={classes.search_input} placeholder="Я ищу..."/>
            <div className={classes.search_icon}>
              <Image src={Search} alt="Search Icon"/>
            </div>
          </Link>

          <Flex align='center' gap={40}>
            <Link to={ token ? "/user" : "/login" } className={classes.nav_link_item}>
              <Flex w={40} h={60} direction='column' align='center' justify='flex-end' >
                { isAuth ? <Image src={image} w={26} h={26}/> : <Image src={Login} w={26} h={26}/> }
                { isAuth ? <span>{username}</span> : <span>Войти</span>}
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
              <Flex w={56} h={60} direction='column' align='center' justify='flex-end' style={{position: 'relative'}}>
                <Image src={Basket} w={26} h={26}/>
                <span>Корзина</span>
                <div className={classes.circle}> 
                  {totalProducts}
                </div>
              </Flex>
            </Link>

          </Flex>  

        </Flex>
      </Flex> 
    </>
  )
}
