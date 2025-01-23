import { Flex, Image } from "@mantine/core"
import React from "react"
import "./Cart.css"
import { Link } from "react-router-dom";

interface ICart {
    id:number;
    thumbnail: string;
    price: number;
    title: string;
}

export const Card: React.FC<ICart> = ({id, thumbnail, price, title }) => {
  return (
    <Link to={`/details/${id}`}>
        <Flex w={290} direction='column' className="card" gap={10}>
            <Image w={289} src={thumbnail}/>
            <h4 className="card-price">${price}</h4>
            <span className="card-title">{title}</span>
            <button className="card-btn">Купить</button>
        </Flex>
    </Link>
    
  )
}