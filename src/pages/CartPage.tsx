import { useQuery } from "@tanstack/react-query"
import { ShoppingCart } from "../components/cart-list/ShoppingCart"
import { getMe } from "../services/service"
import { Delivery } from "../components/delivery/Delivery"

export const CartPage = () => {

  const { data, isSuccess } = useQuery({
    queryKey: ['auth'],
    queryFn: getMe
  })

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

