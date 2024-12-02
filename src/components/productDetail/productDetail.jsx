
import { useContext, useEffect, useRef, useState} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';
//productos
import { Link, useNavigate } from "react-router-dom";
//icon
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { green, red } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
//alert
import Swal from 'sweetalert2'
import Ubiproducto from "../ubiproducto/ubiproducto";

const URL = import.meta.env.VITE_BACKEND_URL


export default function PorductDetail() {
    // update imagen
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef(undefined);

    const buttonSx = {
        ...(success && {
        bgcolor: green[500],
        '&:hover': {
            bgcolor: green[700],
        },
        }),
    };

    const handleButtonClick = async () => {
        console.log(file);
        if (file == null) {
            alert('error')
        }else{
            // carga
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
            setLoad(true)
            const res1 = await addimgProduct(producto.IdGenerate, file)
            const res2 = await getProductoIms(producto.IdGenerate) 
            console.log(res1);
            console.log(res2);
            if(res1 && res2){
                setImgs(res2)
                setLoad(false)
                alert('success')
            }else{
                alert('error')

            }
        }
      };
    //
    const {
        alert, view, refresh,
        tipos, getTipos,
        producto, deleteProductoImg, setIdg,
        deleteProducto, imgs, addimgProduct, getProductoIms, setImgs, getUbiProducto, setUbi
    } = useContext(MiContexto)    

    const router = useNavigate()

    const [viewLug, setViewLug ] = useState(false)
    const [load, setLoad ] = useState(false)
    const [prod, setProd ] = useState({})
    const [file, setFile] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Obtén el primer archivo seleccionado
        setFile(file)
        console.log('Archivo seleccionado:', file);
    };
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(producto.id)
    }

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

    useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
    }, []);


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
                {producto.length == 0 || load ? <div></div> : <Card sx={{maxWidth: 1200, margin: 'auto', marginTop: '25px', padding: 2 }}>
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
                                    Precio: ${prod.Precio_U}
                                    </Typography>
                                    <Typography variant="h7" component={'h3'} color="text.secondary">
                                    Stock: {prod.stock}
                                    </Typography>
                                </CardContent>
                                <CardActions >
                                    <Box component='form' onSubmit={handleSubmit} encType="multipart/form-data" >
                                        {view == 'view' ? <div>
                                            <Box sx={{
                                                    color: 'white',
                                                    display: 'inline-block',
                                                    backgroundColor: '#035584',  
                                                    border: 'solid 1px',
                                                    marginBottom: '5px',
                                                    height: '35px',
            
                                                    }} >
                                                    <input  
                                                            style={{
                                                                position: 'relative',
                                                                opacity: 0.9,
                                                                height: '50px',
                                                                padding: '5px',
                                                            }}
                                                            type="file" 
                                                            accept=".jpg, .jpeg, .png" 
                                                            onChange={handleFileChange} 
                                                            placeholder="ingresa imagen"
                                                        />
                                            </Box>   
                                            <Box sx={{ mb: 1, position: 'relative' }}>
                                                    <Button
                                                    variant="contained"
                                                    sx={buttonSx}
                                                    disabled={loading}
                                                    onClick={handleButtonClick}
                                                    endIcon={<BackupRoundedIcon/>}
                                                    
                                                    >
                                                    Agregar Imagen
                                                    </Button>
                                                    {loading && (
                                                    <CircularProgress
                                                        size={24}
                                                        sx={{
                                                        color: green[500],
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        marginTop: '-10px',
                                                        marginLeft: '-22px',
                                                        }}
                                                    />
                                                    )}
                                            </Box>
                                        </div>  : <div>user</div> }
                                    </Box>
                                </CardActions>
                            </Grid>
                            <Grid item xs={10} >
                                {view == 'view' ?  <Button size="medium" color="secondary" variant="contained" sx={{marginLeft: '5px'}} onClick={ async ()=>{
                                        await getTipos()
                                        router('/updateProduct')                                     
                                    }} >Modificar prod.</Button> : <div></div>
                                }   
                                {view == 'view' ?  <Button size="medium" color="error" variant="contained" sx={{marginLeft: '5px'}} onClick={ async ()=>{
                                        Swal.fire({
                                            title: "Esta seguro que quiere borrar este producto?",
                                            showDenyButton: true,
                                            showCancelButton: true,
                                            confirmButtonText: "Si",
                                            denyButtonText: `No`
                                          }).then( async (result) => {
                                            //resultado de la respuesta
                                            if (result.isConfirmed) {
                                              Swal.fire("Producto borrado", "", "success");
                                              console.log(producto.id);
                                              let res = await deleteProducto(producto.id)
                                              console.log(res);
                                              res.ok ? (await alert('success'),  refresh() ,router('/inicio')  ) : alert('error')
                                            } else if (result.isDenied) {
                                              Swal.fire("No se produjo ningun cambio", "", "info");
                                            }
                                        });
                                        
                                        
                                    }} >eliminar prod.</Button> : <div></div>
                                }
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
                                        <Button size="small" color="error" variant="contained" onClick={ async ()=>{
                                            Swal.fire({
                                                title: "Esta seguro que quiere borrar esta imagen",
                                                showDenyButton: true,
                                                showCancelButton: true,
                                                confirmButtonText: "Si",
                                                denyButtonText: `No`
                                              }).then( async (result) => {
                                                //resultado de la respuesta
                                                if (result.isConfirmed) {
                                                  Swal.fire("Producto borrado", "", "success");
                                                    console.log(imgs[num]);
                                                    console.log(imgs[num].id);
                                                    let response =  await deleteProductoImg(imgs[num].id)
                                                    console.log(response);
                                                    if (response.ok) {
                                                        const res = await getProductoIms(producto.IdGenerate) 
                                                        console.log(res);
                                                        res.status != 500 ? (setImgs(res), console.log(producto.IdGenerate), setNum(0),
                                                        alert('success')) : (setImgs([]))
                                                    }else{
                                                        alert('error')
                                                    }
                                                } else if (result.isDenied) {
                                                  Swal.fire("No se produjo ningun cambio", "", "info");
                                                }
                                            });
                                            
                                        }} > <DeleteIcon fontSize="large"  /></Button>
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
                                        <Link to='/addproductLug' >
                                            <Button size="small" color="info" variant="contained" sx={{height: '80px'}} onClick={ async ()=>{
                                                setIdg(producto.IdGenerate)
                                            }} >agregar a lugar</Button>
                                        </Link>
                                    </Grid>
                                    {
                                        !viewLug ?  
                                    <Grid item xs={4}>
                                        <Button size="small" color="info" variant="contained" sx={{height: '80px'}} onClick={ async ()=>{
                                        const response = await getUbiProducto(producto.IdGenerate)
                                            if (response.length == 0) {
                                                setUbi(false)
                                                alert('warning')
                                            }else{
                                                setUbi(true)
                                                setViewLug(true)
                                            }
                                        }} >ver Ubicaciones</Button>
                                    </Grid> : 
                                    <Grid item xs={4}>
                                        <Button size="small" color="info" variant="contained" sx={{height: '80px'}} onClick={ async ()=>{
                                        setViewLug(false)
                                        setUbi(false)
                                        }} >ocultar Ubicaciones</Button>
                                    </Grid>
                                    }
                        </Grid>
                    </Grid>
                    <Grid marginTop={10}>
                        <Ubiproducto />
                    </Grid>
                </Card>  
                } 
            </div> 
        ) 
    } 
