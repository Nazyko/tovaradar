import React from 'react'
import { Flex } from '@mantine/core';
import Delete from "../../assets/images/cart/delete.svg"
import Minus from "../../assets/images/cart/minus.svg"
import Plus from "../../assets/images/cart/plus.svg"
import "./CartItem.css"


interface CartItemProps {
  id: number;
  image: string;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
  total: number;
  discountedTotal: number
  increment: (id: number, quantity: number) => void
  decrement: (id: number, quantity: number) => void
  handledelete: (id: number) => void
}

export const CartItem: React.FC<CartItemProps> = ({ id, image, title, price, quantity, decrement, increment, handledelete}) => {

  return (
    <Flex className='cart-item'>
      <img src={image} className='cart-item__img'/>
      <Flex className='cart-item__text' direction='column' gap={9}>
        <p>{title}</p>
        <span>код товара: 67998909</span>
      </Flex> 
      <Flex className='counter'>
        <button className='counter-btn' onClick={ () => decrement(id, quantity)}>
          <img src={Minus} alt=''/>
        </button>
        <span className='counter-value'>{quantity}</span>
        <button className='counter-btn' onClick={ () => increment(id, quantity)}>
          <img src={Plus} alt="" />
        </button>
      </Flex>
      <p className='text-bold'>$ {price}</p>
      <button className='del-btn' onClick={() => handledelete(id)}><img src={Delete} alt="" /></button>
    </Flex>
  )
}   
