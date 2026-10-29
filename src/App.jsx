// import Navbar from "../Common/Navbar"
// import Footer from "../Common/Footer"
import Home from "./Screens/Home"
import About from "./Screens/About"
import Contact from "./Screens/Contact"
import Products from "./Screens/Product"
import Product_det from "./Screens/Product_det"
import Register from "./Screens/Register"
import Profile from "./Screens/Profile"
import Login from "./Screens/Login"
import Cart from "./Screens/Cart"
import Checkout from "./Screens/Checkout"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App(){
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/product_det/:product_id" element={<Product_det/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout/>}/>
        </Routes>
        
      
        </BrowserRouter>
    )
}
export default App


