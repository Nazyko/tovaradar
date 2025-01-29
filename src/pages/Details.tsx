import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ProductData } from "../types/type";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/service";
import { Center, Flex, Loader } from "@mantine/core";
import { Detail } from "../components/details/Detail";


export const Details = () => {
  const { id } = useParams();

  const [card, setCard] = useState<ProductData | undefined>(undefined)
  const limit: number = 0
  const skip: number = 0

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(limit, skip)
  })

  useEffect(()=> {
    if(data?.length) {
      const foundCard = data.find((product) => product.id === Number(id))
      setCard(foundCard)
    }
  }, [id, data])

  if(isLoading) return <Center h={500}><Loader color="lime"/></Center>
  if(isError) return <h1>Server Error</h1>  

  return (
    <Flex className="container-sm">
      {card && (
        <Detail 
          key={card.id}
          id={card.id} 
          title={card.title} 
          description={card.description}
          images={card.images}
          thumbnail={card.thumbnail}
          brand={card.brand}
          price={card.price}
          discountPercentage={card.discountPercentage}
          warrantyInformation={card.warrantyInformation}
          rating={card.rating}
          meta={card.meta}
          dimensions={card.dimensions}
        />
      )}
    </Flex>
  )
}


