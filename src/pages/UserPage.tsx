import { Flex } from "@mantine/core"
import "../components/user/Info.css"
import { Route, Routes } from "react-router-dom"
import { Info } from "../components/user/Info"
import { Orders } from "../components/orders/Orders"
import { Likes } from "../components/likes/Likes"
import { UserNav } from "../components/user/UserNav"


export const UserPage = () => {
  
  return (
    <>
      <Flex className="container-sm">
        <Flex className="user-page" direction='column'>
          <h1 className="user-page-title">Личные данные</h1>
          <Flex gap={22} mt={40} mb={80}>
            <UserNav/>
            <Routes>
              <Route path="info" element={<Info />} />
              <Route path="orders" element={<Orders />}/>
              <Route path="likes" element={<Likes />}/>
            </Routes>
          </Flex>
        </Flex>      
      </Flex> 
    </>
  )
}

