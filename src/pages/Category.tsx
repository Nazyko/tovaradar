import { Flex, Loader } from "@mantine/core"
import { Slider } from "../components/slider/Slider"
import { useQuery } from "@tanstack/react-query"
import { getProductsByCategory } from "../services/service"
import { useParams } from "react-router-dom"
import { Card } from "../components/card/Card"


export const Category = () => {

  const { category } = useParams();
  
  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['category'],
    queryFn: () => getProductsByCategory(category)
  })

  if(isLoading) return <Loader color="lime"/>
  if(isError) return <h1>Server Error</h1>

  return (
    <div>
      <Slider />
      <Flex className="container-sm" gap={20} wrap='wrap' mt={40} mb={80}>
        {isSuccess && data.products.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            thumbnail={item.thumbnail}
            price={item.price}
            title={item.title}
          />
        ))}
      </Flex>
    </div>
  )
}
