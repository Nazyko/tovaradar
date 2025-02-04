import { Flex, Center, Loader } from "@mantine/core"
import { Card } from "../components/card/Card";
import { useAppSelector } from "../store/hook";


export const SearchResultPage = () => {
  const { products, error, loading } = useAppSelector(state => state.search)

  if (loading) return <Center h={500}><Loader color="lime"/></Center> 
  if (error) return <h1>Server Error</h1>

  return (
    <Flex className="container-sm">
      <Flex wrap='wrap' gap={20} mt={40} mb={80}>
        {
          products ? 
            products.map((card) => (
              <Card key={card.id} id={card.id} thumbnail={card.thumbnail} title={card.title} price={card.price}/>
            ))
          : <span>Такого продукта не существует.</span>
        }
      </Flex>
    </Flex>
  )
}


