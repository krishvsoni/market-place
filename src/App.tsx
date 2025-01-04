import './App.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboard from './pages/OnBoard';
import ProductsPage from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ProductUpload from './pages/ProductUpload';
import TokenCreationForm from './pages/TokenCreation';
import TokenAirdropPage from './pages/AirDropPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<Onboard/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/productupload" element={<ProductUpload />} />
        <Route path="/createtoken" element={<TokenCreationForm />} />
        <Route path="/airdroptoken" element={<TokenAirdropPage />} />
      </Routes>
    </Router>


  )
}

export default App
