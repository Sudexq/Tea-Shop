import "./App.css";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Products } from "./components/Products";
import { WrongPath } from "./components/WrongPath";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import PaymentPage from "./components/PaymentPage";
import AddressForm from "./components/AddressForm";
import Account from "./components/Account";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address-form" element={<AddressForm />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account/>}/>
        <Route path="*" element={<WrongPath />} />
      </Routes>
    </div>
  );
}

export default App;
