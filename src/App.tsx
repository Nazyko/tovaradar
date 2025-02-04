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
import { useAuth } from "./hooks/useAuth"
import { useAppDispatch } from "./store/hook"
import { getCartProducts } from "./store/cartSlice"


export const App = () => {
  const { userId } = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!userId) return;
    dispatch(getCartProducts(userId))
  }, [dispatch, userId])

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await refreshToken();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        await getMe();
      } catch (error) {
        console.error("Authentication failed", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    };

    initAuth();
  }, []);

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

