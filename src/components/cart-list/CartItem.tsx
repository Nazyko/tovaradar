import React from 'react'
import { Flex } from '@mantine/core';
import Delete from "../../assets/images/cart/delete.svg"
import Minus from "../../assets/images/cart/minus.svg"
import Plus from "../../assets/images/cart/plus.svg"
import "./CartItem.css"
import { useAppDispatch } from '../../store/hook';
import { deleteCartProduct, deleteCartProducts, updateCartProducts } from '../../store/cartSlice';
import { useProductsCart } from '../../context/ProductCartContext';
import { getMe } from '../../services/service';
import { useQuery } from '@tanstack/react-query';

interface CartItemProps {
  id: number;
  image: string;
  title: string;
  price: number;
}

export const CartItem: React.FC<CartItemProps> = ({ id, image, title, price }) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useProductsCart()
  const cartItems = JSON.parse(localStorage.getItem("cart-products") || "[]")
  const dispatch = useAppDispatch()

  const quantity = getItemQuantity(id)

  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: getMe
  })

  const userId = data?.id ? data.id : 0

  const increment = () => {
    increaseCartQuantity(id)
    dispatch(updateCartProducts({ userId, products: cartItems }))
  }
  
  const decrement = () => {
    decreaseCartQuantity(id)
    dispatch(updateCartProducts({ userId, products: cartItems }))
  }

  const handledelete = (id: number) => {
    dispatch(deleteCartProducts(id))
    dispatch(deleteCartProduct(id))
  }

  return (
    <Flex className='cart-item'>
      <img src={image} className='cart-item__img'/>
      <Flex className='cart-item__text' direction='column' gap={9}>
        <p>{title}</p>
        <span>код товара: 67998909</span>
      </Flex> 
      <Flex className='counter'>
        <button className='counter-btn' onClick={decrement}>
          <img src={Minus} alt=''/>
        </button>
        <span className='counter-value'>{quantity}</span>
        <button className='counter-btn' onClick={increment}>
          <img src={Plus} alt="" />
        </button>
      </Flex>
      <p className='text-bold'>$ {price}</p>
      <button className='del-btn' onClick={() => handledelete(id)}><img src={Delete} alt="" /></button>
    </Flex>
  )
}   
