import React from 'react'
import { Flex } from '@mantine/core';
import Delete from "../../assets/images/cart/delete.svg"
import Minus from "../../assets/images/cart/minus.svg"
import Plus from "../../assets/images/cart/plus.svg"
import "./CartItem.css"

interface CartItemProps {
    image: string;
    title: string;
    price: number;
}

export const CartItem: React.FC<CartItemProps> = ({ image, title, price }) => {
  return (
    <Flex className='cart-item'>
      <img src={image} className='cart-item__img'/>
      <Flex className='cart-item__text' direction='column' gap={9}>
        <p>{title}</p>
        <span>код товара: 67998909</span>
      </Flex>
      <Flex className='counter'>
        <button className='counter-btn'>
          <img src={Minus} alt=''/>
        </button>
        <span className='counter-value'>{1}</span>
        <button className='counter-btn'>
          <img src={Plus} alt="" />
        </button>
      </Flex>
      <p className='text-bold'>$ {price}</p>
      <button className='del-btn'><img src={Delete} alt="" /></button>
    </Flex>
  )
}
