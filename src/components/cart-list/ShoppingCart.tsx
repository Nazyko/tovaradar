import { Flex } from '@mantine/core'
import React, { useEffect } from 'react'
import { CartItem } from './CartItem'
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { deleteCartItem, deleteCartProducts, getCartProducts, updateCartProducts } from '../../store/cartSlice';
import "./ShoppingCart.css"

interface ShoppingCartProps {
    userId: number;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ userId }) => {
    const dispatch = useAppDispatch();
    const { carts, error } = useAppSelector(state => state.cart);

    const cart = carts.length > 0 ? carts[0] : null;
    const cartId = cart ? cart.id : null;
    const total = cart ? cart.total : 0;
    const discountedTotal = cart ? cart.discountedTotal : 0;
    const totalProducts = cart ? cart.totalProducts : 0;
    const products = cart ? cart.products : [];

    useEffect(() => {   
        if (userId) {
            dispatch(getCartProducts(userId));
        }
    }, [dispatch, userId]);

    const increment = (id: number, quantity: number) => {
        if (!cartId) return;
        dispatch(updateCartProducts({ cartId, products: [{ id, quantity: quantity + 1 }] }));
    };

    const decrement = (id: number, quantity: number) => {
        if (!cartId || quantity <= 1) return;
        dispatch(updateCartProducts({ cartId, products: [{ id, quantity: quantity - 1 }] }));
    };

    const handledelete = (id: number) => {
        if (!cartId) return;
        dispatch(deleteCartProducts(cartId));
        dispatch(deleteCartItem(id))
    };

    if (error) {
        console.log(error);
    }

    return (
        <Flex className='container-sm'>
            <Flex className='cart' direction='column' mt={40}>
                <h1 className="cart__title">Оформление товара</h1>
                <Flex mt={40} gap={21}>
                    <Flex w={910} className='cart__items' direction='column' gap={20}>
                        {products.length > 0 ? (
                            products.map(product => (
                                <CartItem 
                                    key={product.id}
                                    id={product.id}
                                    image={product.thumbnail}
                                    title={product.title}
                                    quantity={product.quantity}
                                    price={product.price}
                                    discountPercentage={product.discountPercentage}
                                    total={product.total}
                                    discountedTotal={product.discountedTotal}
                                    increment={increment}
                                    decrement={decrement}
                                    handledelete={handledelete}
                                />
                            ))
                        ) : (
                            <p>Корзина пуста</p>
                        )}
                    </Flex>
                    <Flex className='cart-total' direction='column' gap={12}>
                        <h3 className="cart-total__title">Ваш заказ</h3>
                        <Flex direction='column' gap={30}>
                            <Flex align='center' justify='space-between'>
                                <span>Товары ({totalProducts})</span>
                                <span className='text-bold-sm'>$ {total.toFixed(2)}</span>
                            </Flex>
                            <Flex align='center' justify='space-between'>
                                <span className='text-bold-lg'>Итого:</span>
                                <span className='text-bold-sm'>$ {discountedTotal.toFixed(2)}</span>
                            </Flex>
                        </Flex>     
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
