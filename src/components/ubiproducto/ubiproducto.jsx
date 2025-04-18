
import { useContext, useEffect} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, CardContent, Grid, Tooltip} from '@mui/material';
import { Link } from "react-router-dom";
//alert
import Swal from 'sweetalert2'
//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import clases from './ubiproducto.module.css'

export default function Ubiproducto() {
    const {
        producto, deleteProductoLugar,
        productoUbi, lugares, infoprod, setInfoprod, ubi,
        updateStockProduct, 
        setProducto,
        setProductoUbi,
        getTipos,
        setImgs,
        getProducto,
        getProductoIms, getProductos,  
        setIdg, alert,
        cart, setCart,
        refresh,
    } = useContext(MiContexto)

    //Eliminacion de producto
    const deleteProdLug = async (prod) =>{
        console.log(prod);
        let res = await deleteProductoLugar(prod.id)
        console.log(res);
        console.log(res.status);
        if (res.status == 200) {
            let resp = await updateStockProduct(producto.IdGenerate)
            console.log('actualiazacion de stock');
            console.log(resp);
            
            if(resp) {
                setProductoUbi([]) 
                setProducto([])
                getTipos()
                setImgs([]) 
                let r = await getProducto(producto.IdGenerate)
                let t = await getProductoIms(producto.IdGenerate)
                    getProductos()
                r ? ( 
                    setProducto(r), 
                    t.status != 500 ? setImgs(t) : setImgs([])  
                ) : alert('error')
                
            }else{
                alert('error')
            }
        }
    }


    useEffect(()=>{
        let info = []
        lugares.map((lug)=>{
            console.log(lug);
            productoUbi.map((pr)=>{
                console.log(pr);
                if (lug.id == pr.id_lugar) {
                    let resul = { id: pr.id, fullname : lug.fullname, stock: pr.stock, id_lugar: lug.id, id_producto: pr.id_producto }
                    info.push(resul)
                }
            })
        })
        setInfoprod(info)
        console.log(producto);
        

    }, [productoUbi])



    return (
        <div>
            {
             !ubi ? <div></div> : <div className={clases.ubi} >{
                infoprod.map((prod, index)=>{
                            console.log(prod.id);
                            return (<div key={index} className={clases.ubi2} >
                                    <Grid container direction="row" padding={1} boxShadow='1px 1px 5px 1px' sx={{maxWidth: '200px' }} > 
                                        <Grid item xs={6} > 
                                            <CardContent sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center'  } } >
                                                <p style={{ margin: '1px', fontSize: 20, fontWeight: 'bold' }}>
                                                {prod.fullname}
                                                </p>
                                                <p style={{ fontSize: 16 }}>
                                                Stock: {prod.stock}
                                                </p>
                                            </CardContent>
                                        </Grid>
                                        <Grid container item xs={6} paddingRight={2} direction="row" justifyContent='space-evenly' alignContent='flex-end' >
                                            <Grid item xs={8} marginBottom={1} >
                                                <Link to='/updateproductLug' >
                                                <Tooltip title="Modificar stock">
                                                    <Button size="small" color="secondary" variant="contained"  onClick={()=>{
                                                        setIdg(producto.IdGenerate)
                                                        sessionStorage.setItem('id', producto.IdGenerate)
                                                        sessionStorage.setItem('lugar', prod.fullname)
                                                        sessionStorage.setItem('id_lugar', prod.id_lugar)
                                                    }} ><AddCircleIcon/></Button>
                                                </Tooltip>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={8} marginBottom={1}>
                                            <Tooltip title="Eliminar de este lugar">
                                                <Button size="small" color="error" variant="contained" onClick={ async ()=> {
                                                    Swal.fire({
                                                        title: "Esta seguro que quiere borrar el producto de este lugar?",
                                                        showDenyButton: true,
                                                        showCancelButton: true,
                                                        confirmButtonText: "Si",
                                                        denyButtonText: `No`
                                                      }).then((result) => {
                                                        //resultado de la respuesta
                                                        if (result.isConfirmed) {
                                                          Swal.fire("Producto borrado", "", "success");
                                                          deleteProdLug(prod)
                                                        } else if (result.isDenied) {
                                                          Swal.fire("No se produjo ningun cambio", "", "info");
                                                        }
                                                      });
                                                }} ><DeleteIcon/></Button>
                                            </Tooltip>
                                            </Grid>
                                            <Grid item xs={8} marginBottom={1}>
                                            <Tooltip title="Agregar al carrito">
                                                <Button size="small" color="success" variant="contained" onClick={async ()=>{
                                                        let value = false
                                                        console.log(cart);
                                                        
                                                        cart.map((el)=>{  
                                                            console.log(el.id);  
                                                            console.log(producto.IdGenerate);
                                                            if (el.idg == producto.IdGenerate) {
                                                                console.log('if');
                                                                value = true
                                                            }
                                                        })
                                                        console.log(value);
                                                        !value ? Swal.fire({
                                                            title: "Ingrese cantidad",
                                                            input: "text",
                                                            inputAttributes: {
                                                            autocapitalize: "off"
                                                            },
                                                            showCancelButton: true,
                                                            confirmButtonText: "aceptar",
                                                            showLoaderOnConfirm: true,
                                                        }).then( async (result) => {
                                                            if (result.isConfirmed && result.value <= prod.stock ) {
                                                                alert('success')
                                                                const carrito = []
                                                                cart.map((el)=>{
                                                                    carrito.push(el)
                                                                })
                                                                const info = {
                                                                    id : producto.IdGenerate,
                                                                    lugar : prod.fullname,
                                                                    id_lugar : prod.id_lugar,
                                                                    cantidad : result.value
                                                                }
                                                                carrito.push(info)                    
                                                                setCart(carrito) 
                                                                refresh()  
                                                                
                                                            }else{ alert('error') }
                                                        }) :  
                                                        Swal.fire({
                                                            icon: "error",
                                                            title: "Producto ya existe en el carrito",
                                                            text: "si quiere cambiar de lugar porfavor primero elimine el producto del carrito y vuelvalo a cargar",
                                                        });
                                                    }} ><ShoppingCartIcon/></Button>
                                            </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    </div>
                                    )
                        })
                } </div>   
            }</div>
)}
