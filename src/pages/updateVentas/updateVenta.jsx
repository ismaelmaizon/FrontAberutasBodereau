import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../../components/context/context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/navBar";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';



let cartDelete = []

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0 // Opcional, dependiendo si querés decimales o no
    }).format(precio);
};

export default function UpdateVenta () {

    const {
        estados, view, 
        ventainf, refreshVenta, 
        ventainfProds, updateVenta, alert} = useContext(MiContexto)

    const router = useNavigate()
    const [nameEstado, setNameEstado] = useState('sin estado')
    const [total, setTotal] = useState(ventainf.total)
    //const [cartDelete, setCartDelete ] = useState([])
    const [cart, setCart] = useState(ventainfProds)
    const [data, setData] = useState({
        apellido: ventainf.apellido,
        nombre: ventainf.nombre,
        email: ventainf.email,
        fecha: ventainf.fecha,
        id_venta: ventainf.id_venta,
        cel: ventainf.cel,
        provincia: ventainf.provincia,
        localidad: ventainf.localidad,
        calle: ventainf.calle,
        altura: ventainf.altura,
        estado: ventainf.estado,
        total: total
    });

    const dataFrom = async (event) => {
        event.preventDefault()      
        setData( {...data, [event.target.name]: event.target.value  } )
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        
    }

    const deletePord = async (id) => {
        console.log(id);
        cartDelete.push(id)
        
        const newCart = cart.filter(el => el.id !== id)
        console.log(newCart);
        
        let full = 0
        newCart.map((el)=>{
            console.log(full);
            full += el.subtotal
            console.log(full);
        })
        
        setTotal(full)
        setCart(newCart)
    }

    useEffect(()=>{
        console.log(view);
        console.log(ventainf);
        console.log(ventainfProds);
        estados.map((es)=>{
            if(es.id == ventainf.estado){
                setNameEstado(es.estado)
            }
        })
    },[ventainfProds])


    return(
        <div>
        <NavBar/>
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '50px', marginBottom: '50px', padding: '15px', boxShadow: '2px 2px 10px 2px' }}  >
            <Typography variant="h4" sx={{ width:'300px', margin: 'auto' }} >
            Actualizar Venta 
            </Typography>
            <Box component='form' onSubmit={handleSubmit} encType="multipart/form-data" display={'flex'} flexDirection={'column'} m={3} > 
                <Grid container direction='row' marginBottom="40px" >
                    <Grid item xs={10} margin={'auto'} padding={2} >
                        <Typography variant="h7" component={'h2'} sx={{ width:'100%', margin: 'auto' }} >
                            ID venta: {ventainf.id_venta}
                        </Typography>                
                    </Grid>
                    <Grid item xs={10} container direction='row' spacing={1} sx={{ margin:'auto' }} >
                            <Grid item xs={6}>
                            <TextField helperText='Nombre' fullWidth label={ventainf.nombre} name='nombre' type="text" onChange={dataFrom}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                            <TextField helperText='Apellido' fullWidth label={ventainf.apellido} name='apellido' type="text" onChange={dataFrom}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                            <TextField helperText='Email' fullWidth label={ventainf.email} name='email' type="text" onChange={dataFrom}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                            <TextField helperText='Provincia' fullWidth label={ventainf.provincia} name='provincia' type="text" onChange={dataFrom}></TextField>
                            </Grid>
                    </Grid>
                    <Grid item xs={10} container direction="row" spacing={1} sx={{ margin:'auto' }}>
                            <Grid item xs={6}>
                            <TextField helperText='Celular' fullWidth label={ventainf.cel} name='cel' type="text" onChange={dataFrom}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                            <TextField helperText='Localidad' fullWidth label={ventainf.localidad} name='localidad' type="text" onChange={dataFrom}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                            <TextField helperText='Calle' fullWidth label={ventainf.calle} name='calle' type="text" onChange={dataFrom}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                            <TextField helperText='Altura' fullWidth label={ventainf.altura} name='altura' type="number" onChange={dataFrom}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                            <TextField helperText='Total' disabled fullWidth label={formatearPrecio(total)} name='total' type="number" onChange={dataFrom}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    sx={{height: '0px'}}
                                    id="outlined-select-currency"
                                    select
                                    label={nameEstado}
                                    name="estado"
                                    helperText="Please select your lado"
                                    onChange={dataFrom}
                                    >
                                    {estados.map((option, index) => (
                                        <MenuItem key={index} value={option.id}>
                                        {option.estado}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} direction='row' gap={2} paddingBottom={2} mt={5} >
                                <Grid item xs={2}><Typography variant="body1" component='h3'>ID</Typography></Grid>
                                <Grid item xs={1} ><Typography variant="body1" component='h3'>Tipo</Typography></Grid>
                                <Grid item xs={2} ><Typography variant="body1" component='h3'>Descripcion</Typography></Grid>
                                <Grid item xs={1}><Typography variant="body1" component='h3'>Cantidad</Typography></Grid>
                                <Grid item xs={2}><Typography variant="body1" component='h3'>SubTotal</Typography></Grid>
                                <Grid item xs={2}><Typography variant="body1" component='h3'>Descuento</Typography></Grid>
                                
                            </Grid>
                            <Grid container item xs={12} direction='row' gap={2}>
                                {
                                cart.map((el, index)=>{ 
                                    return <Grid item xs={12} key={index}
                                                container direction="row" color='grey.500' gap={2} > 
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>{el.IdGenerate} </Typography></Grid>
                                                    <Grid item xs={1}><Typography variant="body1" component='h3'>{el.Tipo}</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>{el.Descripcion}</Typography></Grid>
                                                    <Grid item xs={1}><Typography variant="body1" component='h3'>{el.cantidad}</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>{formatearPrecio(el.subtotal)}</Typography></Grid>
                                                    { el.descuento == undefined ? 
                                                    <Grid item xs={1}><Typography variant="body1" component='h3'> Sin Descuento </Typography></Grid> 
                                                    : 
                                                    <Grid item xs={1}><Typography variant="body1" component='h3'> {el.descuento} % </Typography></Grid> 
                                                    }
                                                    <Grid item xs={1}><Button onClick={ async ()=>{ await deletePord(el.id) }} ><DeleteForeverRoundedIcon/></Button></Grid>
                                        </Grid>
                                })
                                }
                </Grid>    
                <Grid container direction='row' sx={{ width:'500px', margin: 'auto' }} spacing={5}>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" size="small" sx={{ width:'200px', margin: 'auto' }} onClick={ async ()=>{
                            data.total = total
                            console.log(cart);
                            console.log(data);
                            console.log(cartDelete);
                            let respon = await updateVenta(data, cartDelete)
                            cartDelete = []
                            console.log(respon.status);
                            if (respon.status == 200) {
                                await alert('success')
                                refreshVenta()
                                router('/inicio')
                            } else if (respon.status == 201){
                                await alert('errorCreate')
                            } else {
                                await alert('error')
                            }
                        }}>modificar</Button>

                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" color="error" size="small" sx={{ width:'200px', margin: 'auto' }} onClick={ ()=>{
                            router('/inicio')
                        } } >vovler</Button>
                    </Grid>
                </Grid>
            </Box>  
        </Box>        
        </div>
    )
}
