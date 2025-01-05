
import { useContext, useEffect} from "react"
import { MiContexto } from "../context/context"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//lugares
import {Button} from '@mui/material';
//productos
import Productos from "../productos/productos";
//icons
import Ventas from "../ventas/ventas";
import Venta from "../venta/venta";
import NavBar from "../navbar/navBar";
import PorductDetail from "../productDetail/productDetail";
import InfoProdVenta from "../productosVenta/infoProdVenta";


export default function Inicio() {
    const {
        getLocal, setview, view,
        getEstados,
        getTipos,
        vprod, setVprod, vent, setVent,
        getProductos, getVentas, getLugares,
        productoUbi, lugares, setInfoprod, 
    } = useContext(MiContexto)

    const router = useNavigate()

    

    useEffect(()=>{ 
        let info = []
        lugares.map((lug)=>{
            productoUbi.map((pr)=>{
                if (lug.id == pr.id_lugar) {
                    let resul = { fullname : lug.fullname, stock: pr.stock, id_lugar: lug.id }
                    info.push(resul)
                }
            })
        })
        setInfoprod(info)    
        // Usar la función para obtener una cookie llamada "miCookie"
        const userView = getLocal('view');
        console.log(userView);
        
        setview(userView)
        console.log(view);
        
                
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', marginTop: '45px' }} >
                   <Button variant="contained" size="large" color="secondary" style={{ height: '400px', width: '400px', margin: 'auto' }} onClick={ async ()=>{ 
                       let res = await getProductos()
                       if(res.status == 401){      
                        console.log(res.status);
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "su session expiro",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        router('/')
                    }else{
                        await getEstados()
                        await getLugares()
                        await getTipos()
                        setVprod(true) 
                        router('/productos')
                        }}
                       }
                        >Productos</Button>
                   <Button variant="contained" size="large" style={{ height: '400px', width: '400px', margin: 'auto', backgroundColor: '#ab47bc' }} onClick={ async ()=>{ 
                       let res = await getVentas()
                       let res2 = await getProductos()
                       if(res.status == 401 || res2.status == 401){
                            console.log(res.status);
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "su session expiro",
                                showConfirmButton: false,
                                timer: 1500
                              });
                            router('/')
                        }else{
                            await getEstados()
                            await getLugares()
                            await getTipos()
                            setVent(true)
                            router('/ventas') 
                        }
                       }} >Ventas</Button>
               </div>
    
    </div>
    ) 
}
