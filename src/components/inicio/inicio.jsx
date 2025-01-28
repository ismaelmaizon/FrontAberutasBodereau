
import { useContext, useEffect} from "react"
import { MiContexto } from "../context/context"
import { useNavigate } from "react-router-dom";
//lugares
import {Button} from '@mui/material';


export default function Inicio() {
    const {
        getLocal, setview, view,
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
                   <Button variant="contained" size="large" color="secondary" style={{ height: '400px', width: '400px', margin: 'auto' }} 
                   onClick={ ()=>{  
                      router('/productos') 
                    }  
                    }>Productos</Button>
                   <Button variant="contained" size="large" style={{ height: '400px', width: '400px', margin: 'auto', backgroundColor: '#ab47bc' }} 
                   onClick={ async ()=>{ 
                      router('/ventas')   
                       }} >Ventas</Button>
               </div>
    
    </div>
    ) 
}
