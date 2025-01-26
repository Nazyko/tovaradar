import { Flex, Image } from "@mantine/core"
import React from "react"
import "./Card.css"
import { Link } from "react-router-dom";

interface ICard {
    id:number;
    thumbnail: string;
    price: number;
    title: string;
}

export const Card: React.FC<ICard> = ({id, thumbnail, price, title }) => {
  return (
    <Flex w={290} direction='column' className="card" gap={10}>
      <Link to={`/details/${id}`}>
        <Image w={289} src={thumbnail}/>
      </Link>
      <Link to={`/details/${id}`}>
        <h4 className="card-price">${price}</h4>
      </Link>
      <Link to={`/details/${id}`}>
        <span className="card-title">{title}</span>
      </Link>      
      <button className="card-btn">Добавить в корзину</button>
    </Flex>
  )
}