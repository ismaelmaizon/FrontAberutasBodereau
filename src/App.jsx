//import clases from './App.modules.css'
import { Route, Routes } from 'react-router-dom'
//context
import CartProvider from './components/context/context.jsx'
//component
import SignInSide from './components/login/SignInSide.jsx'
import Inicio from './pages/inicio/inicio.jsx'
import AddProducto from './pages/addproduct/addproducto.jsx'
import clases from './App.module.css'
import AddProductLug from './pages/addproductLug/addproductLug.jsx'
import UpdateProductLug from './pages/updateproductLug/updateproductLug.jsx'
import Preview from './pages/preview/preview.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import PorductDetail from './components/productDetail/productDetail.jsx'
import AddTipo from './pages/addtipo/addtipo.jsx'
import AddLugar from './pages/addlugar/addlugar.jsx'
import UpdateVenta from './pages/updateVentas/updateVenta.jsx'
import UpDateProduct from './pages/updateProduct/updateProduct.jsx'
import Productos from './pages/productos/productos.jsx'
import Ventas from './pages/ventas/ventas.jsx'


function App() {

  return (
    <>
      <div className={clases.class} >
        <CartProvider>
          <div>
              <Routes>
                <Route element={<SignInSide/>} path='/' ></Route>
                <Route element={<Inicio/>} path='/inicio' ></Route>
                <Route element={<Productos/>} path='/productos' ></Route>
                <Route element={<Ventas/>} path='/ventas' ></Route>
                <Route element={<AddProducto/>} path='/addproducto' ></Route>
                <Route element={<AddTipo/>} path='/addtipo' ></Route>
                <Route element={<AddLugar/>} path='/addlugar' ></Route>
                <Route element={<AddProductLug/>} path='/addproductLug' ></Route>
                <Route element={<UpdateProductLug/>} path='/updateproductLug' ></Route>
                <Route element={<Preview/>} path='/preview' ></Route>
                <Route element={<Dashboard/>} path='/dashboard' ></Route>
                <Route element={<PorductDetail/>} path='/detalle' ></Route>
                <Route element={<UpdateVenta/>} path='/updateVenta' ></Route>
                <Route element={<UpDateProduct/>} path='/updateProduct' ></Route>
              </Routes>
            </div>
        </CartProvider>
      </div>
    </>
  )
}

export default App