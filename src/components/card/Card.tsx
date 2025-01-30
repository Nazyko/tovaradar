import { Flex, Image } from "@mantine/core"
import React from "react"
import "./Card.css"
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../services/service";
import { addCartProducts } from "../../store/cartSlice";
import { useProductsCart } from "../../context/ProductCartContext";
import { Product } from "../../types/Cart";

interface ICard {
  id:number;
  thumbnail: string;
  price: number;
  title: string;
}

export const Card: React.FC<ICard> = ({id, thumbnail, price, title }) => {
  const { increaseCartQuantity } = useProductsCart()
  const dispatch = useAppDispatch()

  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: getMe
  })

  const userId = data?.id

  const cartItems = localStorage.getItem("cart-products")
  const products: Product[] = cartItems && JSON.parse(cartItems) 

  const addCartItem = (id: number) => {
    increaseCartQuantity(id)
    if (userId) {
      dispatch(addCartProducts({ id: userId, products }));
    } else {
      console.error("Пользователь не авторизован!");
    } 
  };

  return (
    <Flex w={290} direction='column' className="card" gap={10}>
      <Link to={`/details/${id}`}>
        <Image w={289} src={thumbnail} className="card-image"/>
      </Link>
      <Link to={`/details/${id}`}>
        <h4 className="card-price">${price}</h4>
      </Link>
      <Link to={`/details/${id}`}>
        <span className="card-title">{title}</span>
      </Link>      
      <button className="card-btn" onClick={() => addCartItem(id)}>Добавить в корзину</button>
    </Flex>
  )
}