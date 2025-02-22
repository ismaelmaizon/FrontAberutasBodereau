
import { useContext, useEffect, useState} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
//productos

//icon
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { red } from "@mui/material/colors";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
//alert
import Swal from 'sweetalert2'

const URL = import.meta.env.VITE_BACKEND_URL

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0 // Opcional, dependiendo si querés decimales o no
    }).format(precio);
};

export default function InfoProdVenta() {
    
    const {
        alert, refresh,
        tipos, setCart, cart, lugares,
        producto,
        imgs, getUbiProducto
    } = useContext(MiContexto)    

    //const router = useNavigate()

    const [prod, setProd ] = useState({})
    
    const [num, setNum] = useState(0)
    const sum = (number) =>{
        if(num < imgs.length - 1){
            setNum( num + number )
        }else{
            setNum(0)
        }
    }
    const res = (number) =>{
        if(num > 0){
            setNum( num - number )
        }else{
            setNum(imgs.length - 1)
        }
    }

    const addProductCart = async (IdGenerate) =>{
        const response = await getUbiProducto(IdGenerate)
        console.log(response);
        console.log(lugares);
        let value = false
        let info = {
            id : '',
            lugar : '',
            id_lugar : '',
            cantidad : ''
        }
        cart.map((el)=>{  
            console.log(el.id);  
            console.log(IdGenerate);
            if (el.id == IdGenerate) {
                console.log('if');
                value = true
            }
        })
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
                const carrito = []
                cart.map((el)=>{
                    carrito.push(el)
                })
                response.map((prodLug)=>{
                    lugares.map((lug)=>{
                        if (prodLug.id_lugar == lug.id && prodLug.stock >= result.value) {
                            info = {
                                id : IdGenerate,
                                lugar : lug.fullname,
                                id_lugar : prodLug.id_lugar,
                                cantidad : result.value
                            }
                        }
                    })
                })
                
                if (info.id === '') {
                                        
                    setCart(carrito) 
                    console.log(carrito);
                    
                    Swal.fire({
                        icon: "error",
                        title: "problemas por la cantidad",
                        text: "revisar stock de cada deposito",
                    });
                    refresh()  
                    
                }else{

                    carrito.push(info)                    
                    setCart(carrito) 
                    console.log(carrito);
                    
                    alert('success')
                    refresh()  
                }
                
            }else{ alert('error') }
        }) :  
        Swal.fire({
            icon: "error",
            title: "Producto ya existe en el carrito",
            text: "si quiere cambiar de lugar porfavor primero elimine el producto del carrito y vuelvalo a cargar",
        });
    }



    useEffect(()=>{
        console.log(producto);
        console.log(imgs);
        console.log(imgs.length);

        tipos.map((ti)=>{
            if (producto.Tipo == ti.id) {
                //console.log('dentro');
                let newProd = {
                    id: producto.id,
                    IdGenerate: producto.IdGenerate, 
                    Tipo: ti.Tipo, 
                    Descripcion: ti.Descripcion,
                    Alto: producto.Alto,
                    Ancho: producto.Ancho,
                    Derc: producto.Derc,
                    Izq: producto.Izq,
                    stock: producto.stock,
                    Precio_U: producto.Precio_U
                    }  
                    setProd(newProd)
            }  
        }
        )              
    }, [producto])


    return (
        <div>
                {producto.length == 0 ? <div></div> : <Card sx={{maxWidth: 1200, margin: 'auto', marginTop: '25px', padding: 2 }}>
                    <Grid container direction='row'  >
                        <Grid item xs={5} direction='row' alignItems='center'>
                            <Grid item xs={16}>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="h2">
                                    Informacion del Producto 
                                    </Typography>
                                    <Typography variant="h7" component={'h3'} color="text.secondary">
                                    Id Producto: {prod.IdGenerate}
                                    </Typography>
                                    <Typography  variant="h7" component={'h3'} color="text.secondary">
                                    Tipo: {prod.Tipo}
                                    </Typography>
                                    <Typography  variant="h7" component={'h3'} color="text.secondary">
                                    Descripcion: {prod.Descripcion}
                                    </Typography>
                                    <Typography variant="h7" component={'h3'} color="text.secondary">
                                    Precio: {formatearPrecio(prod.Precio_U) }
                                    </Typography>
                                    <Typography variant="h7" component={'h3'} color="text.secondary">
                                    Stock: {prod.stock}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            
                        </Grid>
                        {
                           imgs.length != 0 ?   
                            <Grid container item xs={3} direction='row'>
                                <Grid item xs={16}>
                                    <CardMedia
                                        sx={{ display: 'flex', margin: 'auto' ,height: 250, width: 200,  ":hover": {
                                            transform: 'scale(1.1)'
                                          }, }}
                                        image={`http://${URL}/static/${imgs[num].url}`}
                                        title="green iguana"
                                    ></CardMedia>
                                    
                                </Grid>
                                <Grid container item xs={16} direction='row' >
                                    <Grid item xs={2} margin='auto' >
                                        <Button size="small" color="info" variant="contained" onClick={()=>{ sum(1) }}> <ArrowLeftRoundedIcon fontSize="large"  /></Button>
                                    </Grid>
                                    <Grid item xs={2} margin='auto' bgcolor={red} >
                                        <Button size="small" color="secondary" variant="contained" onClick={ async ()=>{
                                            Swal.fire({
                                                imageUrl: `http://${URL}/static/${imgs[num].url}`,
                                                imageHeight: 650,
                                                imageAlt: "A tall image"
                                              });
                                        }} > <ImageSearchIcon fontSize="large"  /></Button>
                                    </Grid>
                                    <Grid item xs={2} margin='auto'>
                                        <Button size="small" color="info" variant="contained" onClick={()=>{ res(1) }}> <ArrowRightRoundedIcon fontSize="large" /></Button>
                                    </Grid>
                                </Grid>
                            </Grid> :
                            <Grid container item xs={3} direction='row'>
                                <Grid item xs={16}>
                                    <CardMedia
                                        sx={{ display: 'flex', margin: 'auto' ,height: 250, width: 200 }}
                                        
                                        title="green iguana"
                                    > <InsertPhotoIcon sx={{ display: 'flex', margin: 'auto', fontSize: '100px'}}  /> </CardMedia>
                                </Grid>
                                <Grid container item xs={16} direction='row' >
                                    <Grid item xs={2} margin='auto' >
                                        <Button size="small" color="info" variant="contained" onClick={()=>{ sum(1) }}> <ArrowLeftRoundedIcon fontSize="large"  /></Button>
                                    </Grid>
                                    <Grid item xs={2} margin='auto'>
                                        <Button size="small" color="info" variant="contained" onClick={()=>{ res(1) }}> <ArrowRightRoundedIcon fontSize="large" /></Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        <Grid item xs={3} container direction='column' alignContent='center' >
                            <Grid item xs={4} >
                                    <Button size="small" color="info" variant="contained" sx={{height: '80px'}} 
                                    onClick={ async ()=>{
                                        addProductCart(producto.IdGenerate)
                                    }} ><ShoppingCartIcon/> </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>  
                } 
            </div> 
        ) 
    } 
