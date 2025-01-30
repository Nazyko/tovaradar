import { Flex } from '@mantine/core'
import React, { useEffect } from 'react'
import { CartItem } from './CartItem'
import { useAppDispatch } from '../../store/hook';
import { useAppSelector } from '../../store/hook';
import { getCartProducts } from '../../store/cartSlice';
import "./ShoppingCart.css"


interface ShoppingCartProps {
    id: number;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ id }) => {
    const { carts, error, products } = useAppSelector(state => state.cart)    

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCartProducts(id))
    }, [dispatch, id])

    const cartId = Object.values(carts ?? {}).map(cart => cart.id);
    const total = Object.values(carts ?? {}).map(cart => cart.total);
    const discountedTotal = Object.values(carts ?? {}).map(cart => cart.discountedTotal);
    const totalProducts = Object.values(carts ?? {}).map(cart => cart.totalProducts);
    
    if(error) {
        console.log(error);
    }
    
    return (
        <Flex className='container-sm'>
            <Flex className='cart' direction='column' mt={40}>
                <h1 className="cart__title">Оформление товара</h1>
                <Flex mt={40} gap={21}>
                    <Flex w={910} className='cart__items' direction='column' gap={20}>
                        {
                            products.map(product => (
                                <CartItem 
                                    key={product.id}
                                    cartId={Number(cartId)}
                                    id={product.id}
                                    image={product.thumbnail}
                                    title={product.title}
                                    quantity={product.quantity}
                                    price={product.price}
                                    discountPercentage={product.discountPercentage}
                                    total={product.total}
                                    discountedTotal={product.discountedTotal}
                                />
                            ))
                        }
                    </Flex>
                    <Flex className='cart-total' direction='column' gap={12}>
                        <h3 className="cart-total__title">Ваш заказ</h3>
                        <Flex direction='column' gap={30}>
                            <Flex align='center' justify='space-between'>
                                <span>Товары ({totalProducts})</span>
                                <span className='text-bold-sm'>$ {total}</span>
                            </Flex>
                            <Flex align='center' justify='space-between'>
                                <span className='text-bold-lg'>Итого:</span>
                                <span className='text-bold-sm'>$ {discountedTotal}</span>
                            </Flex>
                        </Flex>     
                    </Flex>
                </Flex>
                
            </Flex>
        </Flex>
    )
}

