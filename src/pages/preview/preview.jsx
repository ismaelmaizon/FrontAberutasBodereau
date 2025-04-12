import { Box, Button, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../../components/context/context";
import { Link, useNavigate } from "react-router-dom";
import PercentIcon from '@mui/icons-material/Percent';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import NavBar from "../../components/navbar/navBar";
import Swal from "sweetalert2";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0 // Opcional, dependiendo si querés decimales o no
    }).format(precio);
};

export default function Preview () {

    const {
        tipos,
        productos, cart, setCart, setVenta,
        registrarVenta, alert
    } = useContext(MiContexto)

    const router = useNavigate()

    
    const [estadoSubTotal, setEstadoSubTotal] = useState(false)
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

    const modifyQuantity = (id, change) => {
        const newCart = cart.map((item) => {
            if (item.id === id) {
                let newQuantity = parseInt(item.cantidad) + parseInt(change);
                console.log(newQuantity);
                if (newQuantity < 1) {
                    newQuantity = 1
                } // Evitar valores menores a 1
                console.log(item);
                if (newQuantity > item.stock) {
                    Swal.fire({
                        title: "Superaste el Stock Disponible",
                        icon: "error",
                        draggable: true
                    });
                    return { ...item, cantidad: item.cantidad, subTotal: parseFloat(item.precio_U) * newQuantity };
                }
                
                return { ...item, cantidad: newQuantity, subTotal: parseFloat(item.precio_U) * newQuantity };
            }
            return item;
        });        
    
        let full = newCart.reduce((acc, item) => acc + item.subTotal, 0);
    
        setTotal(full);
        setCart(newCart);
        setEstadoSubTotal(false)

    };

    const applyDescuento = (id, descuento) => {
        const newCart = cart.map((item) => {
            if (item.id === id) {
                item.descuento = false
                let newSubTotal = (parseInt(item.subTotal) * parseInt(descuento)) / 100  ;
                console.log(newSubTotal);
                console.log(item.subTotal);
                
                return { ...item, subTotal: (item.subTotal - newSubTotal), descuento: parseInt(descuento) };
            }
            return item;
        });  

        let full = newCart.reduce((acc, item) => acc + item.subTotal, 0);
        console.log(full);
        
    
        setTotal(full);
        setCart(newCart);
        setEstadoSubTotal(true)
    };

    useEffect(()=>{        
        if (!estadoSubTotal) {
            const data = {
                'cliente': cliente,
                'cart': cart,
                'total': total,
                'id_venta': ''
            }
            setVenta(data)
            
           // let newCantidades = []
            let newCart = []
            let full = 0
            productos.map((prod)=>{
                cart.map((prodc)=>{
                    if (prod.IdGenerate == prodc.id || prod.IdGenerate == prodc.idg) {
                        let newProd = {
                            id: prod.id,
                            idg: prod.IdGenerate,
                            tipo: prod.Tipo,
                            lugar: prodc.lugar,
                            stock: prod.stock,
                            id_lugar: prodc.id_lugar,
                            cantidad: parseInt(prodc.cantidad),
                            precio_U: prod.Precio_U, 
                            subTotal: prod.Precio_U * prodc.cantidad
                        }
                        full += newProd.subTotal
                        console.log(newProd);
                        newCart.push(newProd)
                       // newCantidades.push(prodc.cantidad)
                    }
                })  
            })
            setTotal(full)
            tipos.map((ti)=>{
                newCart.map((el)=>{
                    if(ti.id == el.tipo){
                        el.tipo = ti.Tipo
                        el.descripcion = ti.Descripcion
                    }
                })
            })
            setCart(newCart)
            //setCantidades(newCantidades)
            console.log(cart);
            console.log(total);

        }else{
            console.log(cart);
            
        }
        
    }, [total, estadoSubTotal])

    return(
        <div>
            <NavBar/>
            {
                cart.length == 0 ? <Typography> El carrito se encuentra vacio  </Typography> : 
            
                <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} border='solid 0px' boxShadow='5px 2px 15px' >
                                <Grid margin='auto' >
                                    <Typography fontSize={40} >Carrito de Ventas <AddShoppingCartIcon fontSize="50px" /></Typography>
                                </Grid>
                                <Grid container direction='row' gap={5} >
                                    <Grid item xs={6} container direction='column' padding={2} alignItems={'center'} >
                                        {cart.map((el, index)=>{ 
                                            return  <Grid item xs={2} key={index}
                                                        container direction="row" color='grey.300' gap={0} 
                                                        border='solid 0px' boxShadow='5px 0px 12px 2px' borderRadius={3} margin={1}
                                                        padding={2} >
                                                        
                                                        <Grid item xs={12} color='black' justifyItems={'center'} >
                                                            <Typography variant="h7" component={'h2'} color="text.secondary" paddingBottom={1} alignSelf='flex-start'>
                                                                Tipo: {el.tipo}
                                                            </Typography>  
                                                            <Typography variant="h6" component={'p'}>
                                                                Producto: {el.idg} 
                                                            </Typography>  
                                                            <Typography variant="h6" component={'p'}>
                                                                Lugar: {el.lugar} 
                                                            </Typography> 
                                                            <Typography variant="h6" component={'p'}>
                                                                Precio por Unidad: {formatearPrecio(el.precio_U)} 
                                                            </Typography> 
                                                            <Typography variant="h6" component={'p'}>
                                                                Stock: {el.stock} 
                                                            </Typography> 
                                                            <Typography variant="h6" component={'p'}>
                                                                <Grid container direction={'row'} margin={1} >
                                                                    <Grid xs={6} item > 
                                                                        <Typography variant="h6" component={'p'}>
                                                                        Cantidad: { el.cantidad }
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={4} item > 
                                                                        <Button variant="contained" color="secondary" size="small"
                                                                            onClick={() => modifyQuantity(el.id, -1)}
                                                                        ><Typography fontSize={'15px'} > - </Typography></Button>
                                                                    </Grid>
                                                                    <Grid xs={1} item > 
                                                                        <Button variant="contained" color="secondary" size="small"
                                                                            onClick={() => modifyQuantity(el.id, 1)}
                                                                        > <Typography fontSize={'15px'} > + </Typography></Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Typography>

                                                        </Grid>
                                                        
                                                        <Grid item xs={6} color='black' align={'center'} >
                                                            <Typography variant="h7" component={'h2'}>
                                                                SubTotal: {formatearPrecio(el.subTotal) }
                                                            </Typography>
                                                        </Grid>
                                                        
                                                        { el.descuento == undefined ? 
                                                        <Grid item xs={2} align={'center'}  >
                                                            <Tooltip title="aplicar descuento a producto">
                                                                <Button size="small" variant="contained" color='success' onClick={()=>{
                                                                    Swal.fire({
                                                                        title: "Ingrese Descuento",
                                                                        input: "number",
                                                                        inputAttributes: {
                                                                          autocapitalize: "off"
                                                                        },
                                                                        showCancelButton: true,
                                                                        confirmButtonText: "aplicar",
                                                                        showLoaderOnConfirm: true,
                                                                      }).then( (result) => {
                                                                        if (result.isConfirmed){
                                                                            console.log(result.value);
                                                                            applyDescuento(el.id, result.value)
                                                                        } 
                                                                        
                                                                      });
                                                                }} > <PercentIcon/></Button>
                                                            </Tooltip>
                                                        </Grid>
                                                        
                                                        :
                                                        
                                                        <Grid item xs={2} align={'center'} >
                                                            <Tooltip title="aplicar descuento a producto">
                                                                <Button size="small" variant="contained" color='error' onClick={()=>{
                                                                    Swal.fire({
                                                                        title: "Aplique numero de Descuento",
                                                                        input: "number",
                                                                        inputAttributes: {
                                                                          autocapitalize: "off"
                                                                        },
                                                                        showCancelButton: true,
                                                                        confirmButtonText: "aplicar",
                                                                        showLoaderOnConfirm: true,
                                                                      }).then( (result) => {
                                                                        if (result.isConfirmed){
                                                                            console.log(result.value);
                                                                            applyDescuento(el.id, result.value)
                                                                        } 
                                                                        
                                                                      });
                                                                }} > <PercentIcon/> </Button>
                                                            </Tooltip>
                                                        </Grid>
                                                        
                                                        }
                                                        <Grid item xs={2} align={'center'} >
                                                            <Tooltip title="Sacar de Carrito">
                                                                <Button size="small" variant="contained" color='error' onClick={()=>{deletePordCart(el.id)}} ><DeleteIcon /></Button>
                                                            </Tooltip>
                                                        </Grid>
                                            </Grid>
                                        })}
                                        
                                    </Grid>
                                    <Grid item xs={5} container direction="row" alignContent='flex-start'>
                                            <Typography variant="h4" component="h2" margin={4} >Datos Cliente:</Typography>
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
                                    <Grid item xs={4}>
                                        <Typography variant="h7" component={'h5'} >
                                            { estadoSubTotal ? <div>
                                                Con Descuento
                                            </div> :
                                            <div></div>
                                            }
                                        </Typography>
                                        <Typography variant="h8" component={'h2'} >
                                            Total: {formatearPrecio(total)} 
                                        </Typography>
                                        <Link to = '/inicio' >
                                            <Button variant="contained" color='error' sx={{margin : '5px'}} >volver</Button>
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
                                                    'estadoDesc': estadoSubTotal,
                                                    'id_venta': ''
                                                }
                                                const respons = await registrarVenta(info)
                                                console.log(respons);
                                                if (respons.status == 200) {
                                                    info.id_venta = respons.id
                                                    setVenta(info)
                                                    router('/dashboard')
                                                }else{
                                                    alert('error')
                                            }
                                        }
                                        
                                            
                                        }} >
                                            Vender 
                                        </Button>
                                    </Grid>
                                    
                                </Grid>
                </Box> 
            }
        </div>
    ) 
} 
