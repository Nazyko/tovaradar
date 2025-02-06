import React from 'react';
import { Flex, Image } from '@mantine/core'
import Brand from "../../assets/images/details/brand.svg"
import Shape from "../../assets/images/details/shape-icon.svg"
import "./Detail.css"
import { Dimensions, Meta } from '../../types/type';
import { addCartProducts } from '../../store/cartSlice';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store/hook';


interface IDetail {
    id: number;
    title: string;
    description: string;
    images: string[];
    thumbnail: string;
    brand: string;
    price: number;
    discountPercentage: number;
    warrantyInformation: string;
    rating: number;
    meta: Meta;
    dimensions: Dimensions;
}

export const Detail: React.FC<IDetail> = ({ 
    id, 
    title, 
    description, 
    images, 
    thumbnail, 
    brand, 
    price, 
    discountPercentage, 
    warrantyInformation,
    meta,
    dimensions
}) => {
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
    <Flex key={id} className="details" direction='column'mb={80}>
        <h1 className="details_title">{title}</h1>
        
        <Flex w={1220} align='flex-start' mt={40}>
            <Flex w={496} direction='column' align='flex-start' className="image-box" gap={15} mr={22}>
                <Image src={thumbnail}/>
                <Flex className="image-box" gap={5}>
                    {images.map((image, index) => (
                        <Image w={84} key={index} src={image}/>
                    ))}
                </Flex>
            </Flex>
            
            <Flex className="details_text-box" mr={95}>
                <Flex align='center' gap={5}>
                    <img src={Shape} alt="" />
                    <span style={{color: '#2CB708'}}>Все характеристики</span>
                </Flex>
                <Flex direction='column' gap={11}>
                    <Flex align='center' gap={5}>
                        <img src={Brand} alt="" />
                        <span>{brand}</span>
                    </Flex>
                    <Flex align='center' gap={5}>
                        <img src={Brand} alt="" />
                        <span>{title}</span>
                    </Flex>
                </Flex>

                <Flex className='details-warrantyInformation'>
                    <img src={Brand} alt="" />
                    <span>{warrantyInformation}</span>
                </Flex>

                <Flex className='details-description'>
                    <span>{description}</span>
                </Flex>

                <Flex align='center' gap={40}>
                    <h1 className='text-bold'>Размеры</h1>
                    <Flex w={67} h={33} align='center' justify='center' bg='#EEEEEE'>
                        {Math.ceil(dimensions.width)}x{Math.ceil(dimensions.height)}
                    </Flex>
                </Flex>

                <Image w={150} src={meta.qrCode}/>
            </Flex>

            <Flex className="details-card" direction='column' gap={16}>
                <Flex align='center' justify='space-between'>
                    <span className='price'>$ {price}</span>
                    <span style={{color: 'red'}}>- {discountPercentage}%</span>
                </Flex>
                <button className="details-card-btn" onClick={() => addCartItem(id)}>Добавить в корзину</button>
            </Flex>
        </Flex>
    </Flex>
  )
}
