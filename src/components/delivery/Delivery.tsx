import { Flex } from '@mantine/core'
import React from 'react'
import { Address } from "../../types/type"
import "./Delivery.css"

interface DeliveryProps {
    address: Address;
    firstName: string;
    lastName: string;
    email: string;
    phone: string; 
}

export const Delivery: React.FC<DeliveryProps> = ({ address, firstName, lastName, email, phone }) => {
    
    return (
        <Flex className='container-sm'>
            <Flex className='delivery' direction='column' gap={40}>
                <Flex className='delivery-inner' direction='column'>

                    <Flex className="address" direction='column' gap={30}>
                        <div className='delivery-title'>Адрес доставки</div>
                        <Flex direction='column' gap={10}>
                            <div className='delivery_border-box'>
                                <span>{address.country}, </span>  
                                <span>{address.state}, </span>
                                <span>{address.city}, </span>
                                <span>{address.address}</span>
                            </div>
                            <textarea 
                                className='delivery-comment' 
                                placeholder='Комментарий к заказу'>
                            </textarea>
                        </Flex>
                    </Flex>

                    <Flex className="recipient" direction='column' gap={30}>
                        <div className='delivery-title'>Получатель</div>
                        <Flex direction='column' gap={10}>
                            <div className='delivery_border-box'>{firstName}</div>
                            <div className='delivery_border-box'>{lastName}</div>
                            <div className='delivery_border-box'>{email}</div>
                            <div className='delivery_border-box'>{phone}</div>
                        </Flex>
                    </Flex>

                    <Flex className="payment" direction='column' gap={30}>
                        <div className='delivery-title'>Способ оплаты</div>
                        <Flex direction='column' gap={21}>
                            <Flex align='center' gap={10} className="radio-wrapper">
                                <input type="radio" id="cash" name="payment"/>
                                <label htmlFor='cash'>Наличными при полученнии</label>
                            </Flex>
                            <Flex align='center' gap={10} className="radio-wrapper">
                                <input type="radio" id="card" name="payment"/>
                                <label htmlFor="card">Онлайн банковской картой</label>
                            </Flex>
                        </Flex>
                    </Flex>

                </Flex>

                <button type='submit' className='checkout'>Оформить заказ</button>
            </Flex>
        </Flex>
  )
}