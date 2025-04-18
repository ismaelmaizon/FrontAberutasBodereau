import { Box, Button, Grid, MenuItem, Skeleton, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../../components/context/context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/navBar";

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0 // Opcional, dependiendo si querés decimales o no
    }).format(precio);
};


export default function UpDateProduct () {

    const {
        tipos, producto, actualizarProducto, alert,
        setProductoUbi,
        setProducto,
        setImgs, getProducto, getProductoIms,
    } = useContext(MiContexto)

    const router = useNavigate()
    const [tipoProvisorio, setTipoProvisorio] = useState('')
    const [data, setData] = useState({
        IdGenerate: producto.IdGenerate,
        Tipo: producto.Tipo,
        Alto: producto.Alto,
        Ancho: producto.Ancho,
        Lado: '',
        Precio_U: producto.Precio_U,
    });

    const lado = [
        {
          name: 'Derc'
        },
        {
          name: 'Izq'
        }
    ];


    const dataFrom = async (event) => {
        event.preventDefault()      
        setData( {...data, [event.target.name]: event.target.value  } )
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }

    useEffect(()=>{
        
        if (producto.Derc == 0) {
            setData({
                IdGenerate: producto.IdGenerate,
                Tipo: producto.Tipo,
                Alto: producto.Alto,
                Ancho: producto.Ancho,
                Lado: 'Izq',
                Precio_U: producto.Precio_U,
            })
        }else{
            setData({
                IdGenerate: producto.IdGenerate,
                Tipo: producto.Tipo,
                Alto: producto.Alto,
                Ancho: producto.Ancho,
                Lado: 'Derc',
                Precio_U: producto.Precio_U,
            })
        }

        tipos.map((tipo) =>{
            if (tipo.id == producto.Tipo) {
                setTipoProvisorio(tipo.Tipo)
            }
        })
    },[])


    return(
        <div>
            {
                tipos.length != 0 ? <div>
                <NavBar/>
                <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px', boxShadow: '2px 2px 10px 2px' }}  >
                    <Typography variant="h5" gutterBottom sx={{ width:'450px', margin: 'auto' }} >
                        Modificando a ID:  {producto.IdGenerate}
                    </Typography>
                    
                    <Box component='form' onSubmit={handleSubmit} encType="multipart/form-data" display={'flex'} flexDirection={'column'} >            
                    <Grid container direction='row' marginBottom="40px" marginTop="10px">
                        <Grid item xs={10} container direction='row' spacing={3} sx={{ margin:'auto' }} >
                            
                               <Grid item xs={6}>
                                <TextField fullWidth select label={`${tipoProvisorio}`} name='Tipo' type="text"  onChange={dataFrom}>
                                {tipos.map((option, index) => (
                                        <MenuItem key={index} value={option.id}>
                                        {option.Tipo}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                </Grid>
                                
                                <Grid item xs={6}>
                                <TextField fullWidth label={`${data.Alto}`} name='Alto' type="text"  onChange={dataFrom}></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                <TextField fullWidth label={`${data.Ancho}`} name='Ancho' type="text" onChange={dataFrom}></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                {
                                    producto.Derc == 1 ? <TextField
                                    fullWidth
                                    sx={{height: '0px'}}
                                    id="outlined-select-currency"
                                    select
                                    label={`${lado[0].name}`}
                                    value={`${lado[0].name}`}
                                    name="Lado"
                                    helperText="Please select your lado"
                                    onChange={dataFrom}
                                    >
                                    {lado.map((option, index) => (
                                        <MenuItem key={index} value={option.name}>
                                        {option.name}
                                        </MenuItem>
                                    ))}
                                    </TextField> 
                                :
                                        <TextField
                                        fullWidth
                                        sx={{height: '0px'}}
                                        id="outlined-select-currency"
                                        select
                                        label={`${lado[1].name}`}
                                        value={`${lado[1].name}`}
                                        name="Lado"
                                        helperText="Please select your lado"
                                        onChange={dataFrom}
                                        >
                                        {lado.map((option, index) => (
                                            <MenuItem key={index} value={option.name}>
                                            {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField> 
                                }
                                    
                                </Grid>
                        </Grid>
                        <Grid item xs={10} container direction="row" spacing={3} sx={{ margin:'auto' }}>
                                <Grid item xs={6}>
                                    <TextField fullWidth label={`${formatearPrecio(data.Precio_U)}`} name='Precio_U' type="text" onChange={dataFrom}></TextField>
                                </Grid>
                                
                        </Grid>
                    </Grid>
                    <Grid container direction ='row' sx={{ width:'500px', margin: 'auto' }} spacing={5} >
                            <Grid item xs={6}  >
                                <Button type="submit" variant="contained" size="small" sx={{ width:'200px', margin: 'auto' }}  onClick={ async ()=>{    
                                router('/inicio')
                                }} >volver</Button>
                            </Grid>
                            <Grid item xs={6}  >
                                <Button type="submit" variant="contained" size="small" sx={{ width:'200px', margin: 'auto' }} onClick={ async ()=>{
                                    console.log(data);
                                    let respon = await actualizarProducto(data)
                                    console.log(respon.status);
                                    if (respon.status == 200) {
                                            let r = await getProducto(producto.IdGenerate)
                                            let t = await getProductoIms(producto.IdGenerate)
                                            r ? ( 
                                                setProducto(r), 
                                                t.status != 500 ? setImgs(t) : setImgs([])  
                                            ) : alert('error')
                                            setProductoUbi([]) 
                                            await alert('success')

                                            router('/inicio')
                                    } else if (respon.status == 201){
                                        await alert('errorCreate')
                                    } else {
                                        await alert('error')
                                    }

                                }}>Modificar</Button>
                            </Grid>
                        </Grid>
                    
                    </Box>
                </Box>
                </div> : 
                
                <div>
            <NavBar/>    
            <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box></div> 

            }
        
        
        </div>
    )
}
