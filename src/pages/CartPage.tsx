import { useQuery } from "@tanstack/react-query"
import { ShoppingCart } from "../components/cart-list/ShoppingCart"
import { getMe } from "../services/service"
import { Delivery } from "../components/delivery/Delivery"
import { Center, Loader } from "@mantine/core"

export const CartPage = () => {

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['auth'],
    queryFn: getMe
  })

  if (isLoading) return <Center h={300}><Loader color="lime" /></Center> 
  if (isError) return <h1>Server Error!</h1> 

  if (isSuccess && data)

  return (
    <div>
      <ShoppingCart id={data.id}/>
      <Delivery 
        address={data.address} 
        firstName={data.firstName}
        lastName={data.lastName}
        email={data.email}
        phone={data.phone}
      />
    </div>
  )
}

