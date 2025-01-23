import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./layout/Layout"
import { HomePage } from "./pages/HomePage"
import { Details } from "./pages/Details"
import { CartPage } from "./pages/CartPage"
import { User } from "./pages/User"
import { Category } from "./pages/Category"
import { NotFoundPage } from "./pages/NotFoundPage"
import { SearchResultPage } from "./pages/SearchResultPage"
import { Login } from "./auth/Login"
import { PrivateRoute } from "./auth/PrivateRoute"


export const App = () => {

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
              <Route path="/cart" element={<CartPage/>}/>
              <Route path="/user" element={<User/>} />
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NotFoundPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

