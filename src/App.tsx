import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./layout/Layout"
import { HomePage } from "./pages/HomePage"
import { Details } from "./pages/Details"
import { CartPage } from "./pages/CartPage"
import { UserPage } from "./pages/UserPage"
import { Category } from "./pages/Category"
import { NotFoundPage } from "./pages/NotFoundPage"
import { SearchResultPage } from "./pages/SearchResultPage"
import { Login } from "./auth/Login"
import { PrivateRoute } from "./auth/PrivateRoute"
import { getMe, refreshToken } from "./services/service"
import { useEffect } from "react"


export const App = () => {

  useEffect(()=>{
    refreshToken()
  }, [])
  
  if(localStorage.getItem('accessToken')) {
    getMe()
  }
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/details/:id" element={<Details/>}/>
            <Route path="/category/:category" element={<Category/>}/>
            <Route path="/search" element={<SearchResultPage/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/user/*" element={<UserPage/>} />
              <Route path="/cart" element={<CartPage/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NotFoundPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

