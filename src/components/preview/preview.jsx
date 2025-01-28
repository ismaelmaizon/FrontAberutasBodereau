import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import PercentIcon from '@mui/icons-material/Percent';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import NavBar from "../navbar/navBar";
import Swal from "sweetalert2";



export default function Preview () {

    const {
        descuentos, setDecuentos,
        tipos,
        productos ,cart, setCart, venta, setVenta,
        registrarVenta, alert
    } = useContext(MiContexto)

    const router = useNavigate()

    
    const [cantidades, setCantidades] = useState([])
    const [estadoNombre, setEstadoNombre] = useState('')
    const [estadoApellido, setEstadoApellido] = useState('')
    const [estadoCel, setEstadoCel] = useState('')
    
    
    const [total, setTotal] = useState(0)
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        cel: '',
        provincia: '',
        localidad: '',
        calle: '',
        altura: 0
    });
    const dataFrom = async (event) => {
        event.preventDefault()
        setCliente( {...cliente, [event.target.name]: event.target.value.toLowerCase()  } )
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    const deletePordCart = (id) => {
        const newCart = cart.filter(el => el.id !== id)
        let full = 0
        newCart.map((el)=>{
            full += el.subTotal
        })
        setTotal(full)
        setCart(newCart)
    }
    

    const aplicarDescuento = async (index) => {
        console.log(cart[index]);
        console.log(descuentos);
        Swal.fire({
                    title: "Ingrese descuento a aplicar en %",
                    input: "number",
                    inputAttributes: {
                    autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonText: "aceptar",
                    showLoaderOnConfirm: true,
                }).then( async (result) => {
                    console.log(result);
                    console.log(result.value);
                    console.log( parseInt(cart[index].subTotal) * parseInt(result.value) );
                    cart[index].subTotal = cart[index].subTotal - ( ( parseInt(cart[index].subTotal) * parseInt(result.value) ) / 100 )
                    
                    console.log(cart[index]);
                    setCart(cart)
                    
                    console.log(cart);
                    let full = 0
                    cart.map((prod)=>{
                        full += prod.subTotal
                    }) 
                    setTotal(full)
                })
        
        
    }

    useEffect(()=>{        
        const data = {
            'cliente': cliente,
            'cart': cart,
            'total': total,
            'id_venta': ''
        }
        setVenta(data)
        
        let newCantidades = []
        let newCart = []
        let full = 0
        productos.map((prod)=>{
            cart.map((prodc)=>{
                if (prod.IdGenerate == prodc.id || prod.IdGenerate == prodc.idg) {
                    let newProd = {
                        id: prod.id,
                        idg: prod.IdGenerate,
                        Tipo: prod.Tipo,
                        lugar: prodc.lugar,
                        id_lugar: prodc.id_lugar,
                        cantidad: prodc.cantidad,
                        subTotal: prod.Precio_U * prodc.cantidad
                    }
                    full += newProd.subTotal
                    console.log(newProd);
                    newCart.push(newProd)
                    newCantidades.push(prodc.cantidad)
                }
            })  
        })
        setTotal(full)
        tipos.map((ti)=>{
            newCart.map((el)=>{
                if(ti.id == el.Tipo){
                    el.Tipo = ti.Tipo
                    el.Descripcion = ti.Descripcion
                }
            })
        })
        setCart(newCart)
        setCantidades(newCantidades)
        console.log(cart);
        
        console.log(total);
        
    }, [total])

    return(
        <div>
            <NavBar/>
            {
                cart.length == 0 ? <Typography> El carrito se encuentra vacio </Typography> : 
            
                venta.id_venta == '' ? <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} border='solid 0px' boxShadow='5px 2px 15px' >
                                        <Grid margin='auto' >
                                            <Typography fontSize={30} >Carrito de Ventas</Typography>
                                        </Grid>
                                        <Grid container direction='row' gap={5} >
                                            <Grid item xs={6} container direction='column' padding={2} alignItems={'center'} >
                                                {cart.map((el, index)=>{ 
                                                    return <Grid item xs={2} key={index}
                                                                container direction="row" color='grey.300' gap={0} 
                                                                border='solid 0px' boxShadow='5px 0px 12px 2px' borderRadius={3} margin={1}
                                                                padding={2} >
                                                                
                                                                <Grid item xs={12} color='black' justifyItems={'center'} >
                                                                    <Typography variant="h7" component={'h2'} color="text.secondary" paddingBottom={1} alignSelf='flex-start'>
                                                                        Tipo: {el.Tipo}
                                                                    </Typography>  
                                                                    <Typography variant="h6" component={'p'}>
                                                                        Producto: {el.idg} 
                                                                    </Typography>  
                                                                    <Typography variant="h6" component={'p'}>
                                                                        Lugar: {el.lugar} 
                                                                    </Typography> 
                                                                    <Typography variant="h6" component={'p'}>
                                                                        Cantidad: {cantidades[index]} 
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={6} color='black' align={'center'} >
                                                                    <Typography variant="h7" component={'h2'}>
                                                                        SubTotal: $ {el.subTotal}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={6} color='black' align={'center'} >
                                                                    <Button size="large"  variant="contained" color='secondary' onClick={()=>{deletePordCart(el.id)}} ><DeleteIcon /></Button>
                                                                    <Button size="large"  variant="contained" color='secondary' onClick={ async ()=>{ 
                                                                        console.log(cart[index]);
                                                                        console.log(descuentos);
                                                                        Swal.fire({
                                                                                    title: "Ingrese descuento a aplicar en %",
                                                                                    input: "number",
                                                                                    inputAttributes: {
                                                                                    autocapitalize: "off"
                                                                                    },
                                                                                    showCancelButton: true,
                                                                                    confirmButtonText: "aceptar",
                                                                                    showLoaderOnConfirm: true,
                                                                                }).then( async (result) => {
                                                                                    console.log(result);
                                                                                    console.log(result.value);
                                                                                    console.log( parseInt(cart[index].subTotal) * parseInt(result.value) );
                                                                                    cart[index].subTotal = cart[index].subTotal - ( ( parseInt(cart[index].subTotal) * parseInt(result.value) ) / 100 )
                                                                                    
                                                                                    console.log(cart[index]);
                                                                                    await setCart(cart)
                                                                                    console.log(cart);
                                                                                    let full = 0
                                                                                    cart.map((prod)=>{
                                                                                        full += prod.subTotal
                                                                                    })
                                                                                    
                                                                                    await setTotal(full)
                                                                            
                                                                                })
                                                                     }} ><PercentIcon /></Button>
                                                                </Grid>
                                                                
                                                        </Grid>
                                                })}
                                                
                                            </Grid>
                                            <Grid item xs={5} container direction="row" alignContent='flex-start'>
                                                    <Typography variant="h4" component="h2" margin={2} >Datos Cliente:</Typography>
                                                    <Grid container direction="row" spacing={4} onSubmit={handleSubmit} >
                                                        <Grid item xs={6} container direction='column' spacing={2} >
                                                            <Grid item xs={2}>
                                                            { 
                                                                    estadoNombre === '' ?
                                                                        <TextField fullWidth label='nombre' name='nombre' type="text" onChange={dataFrom}></TextField> :
                                                                        <TextField error fullWidth label='nombre' name='nombre' type="text" onChange={dataFrom}></TextField> 
                                                            }
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                            { 
                                                                    estadoApellido === '' ?
                                                                        <TextField fullWidth label='apellido' name='apellido' type="text" onChange={dataFrom}></TextField>:
                                                                        <TextField error fullWidth label='apellido' name='apellido' type="text" onChange={dataFrom}></TextField>  
                                                            }
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <TextField fullWidth label='email' name='email' type="email" onChange={dataFrom}></TextField> 
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                            { 
                                                                    estadoCel === '' ?
                                                                        <TextField fullWidth label='cel' name='cel' type="number" onChange={dataFrom}></TextField> :
                                                                        <TextField error fullWidth label='cel' name='cel' type="number" onChange={dataFrom}></TextField>         
                                                            }
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} container direction='column' spacing={2}>
                                                            <Grid item xs={2}>
                                                            <TextField fullWidth label='provincia' name='provincia' type="text" onChange={dataFrom}></TextField>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                            <TextField fullWidth label='localidad' name='localidad' type="text" onChange={dataFrom}></TextField>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                            <TextField fullWidth label='calle' name='calle' type="text" onChange={dataFrom}></TextField>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                            <TextField fullWidth label='altura' name='altura' type="number" onChange={dataFrom}></TextField>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container padding={2} direction='row' width='100%' >
                                            <Grid item xs={2}>
                                                <Typography variant="h8" component={'h2'} >
                                                    Total: ${total}
                                                </Typography>
                                                <Link to = '/inicio' >
                                                    <Button variant="contained" color='error' >volver</Button>
                                                </Link>
                                            </Grid>
                                            <Box sx={{ flexGrow: 5 }} />
                                            <Grid item xs={2}  alignSelf='flex-end'>
                                                <Button variant="contained" color='success' startIcon={<SendIcon/>} onClick={ async ()=>{
                                                    if (cliente.nombre === '') {
                                                        alert('error')
                                                        setEstadoNombre('error')
                                                    }else if(cliente.apellido === ''){
                                                        alert('error')
                                                        setEstadoApellido('error')
                                                    }else if (cliente.cel === ''){
                                                        alert('error')
                                                        setEstadoCel('error')
                                                    }else{
                                                        alert('success')
                                                        const info = {
                                                            'cliente': cliente,
                                                            'cart': cart,
                                                            'total': total,
                                                            'id_venta': ''
                                                        }
                                                        const respons = await registrarVenta(info)
                                                        console.log(respons);
                                                        if (respons.status == 200) {
                                                            info.id_venta = respons.id
                                                            setVenta(info)
                                                            router('/dashboard')
                                                        }
                                                    }
                                                    
                                                }} >
                                                    Vender 
                                                </Button>
                                            </Grid>
                                            
                                        </Grid>
                                        </Box> 
        : 
        <Box> ID:{venta.id_venta}  </Box>
                
                
            }
        </div>
    ) 
} 
