import { Flex, Image } from "@mantine/core"
import React from "react"
import "./Card.css"
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { addCartProducts } from "../../store/cartSlice";
import { useAuth } from "../../hooks/useAuth";

interface ICard {
  id:number;
  thumbnail: string;
  price: number;
  title: string;
}

export const Card: React.FC<ICard> = ({id, thumbnail, price, title }) => {
  const { userId } = useAuth()
  const dispatch = useAppDispatch()

  const addCartItem = (id: number) => {
    if (!userId) {
      alert('Вы не овторизован. Авторизуйтесь!');
      return;
    } else {
      dispatch(addCartProducts({ userId, products: [{ id: id, quantity: 1 }] }));
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