import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { useContext, useEffect, useState } from 'react';
import { MiContexto } from '../context/context';
import { Autocomplete, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';
import ReplyIcon from '@mui/icons-material/Reply';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import InfoProducts from '../infoProducts/infoProducts';
import SwitchVentasProd from '../switch/switchVentasProd';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const URL = import.meta.env.VITE_BACKEND_URL


export default function ProductosVenta() {

    const {
        getLocal, setview, view, 
        getTipos, tipos,
        setVprod, setVent,
        lugares, getLugares,
        producto, productos, setProductoUbi,
        getProducto, setProducto, getProductoIms, getVentas, setImgs,
        filtrarTipoLadoLug, rows, setRows,
        refresh,
        lug, setLug, lado, setLado, tipo, setTipo, descr, setDescr,
        alert
    } = useContext(MiContexto)

    const router = useNavigate()

    const [sold, setSold] = useState(null)
    const [frecuencia, setFrecuencia] = useState(null)
    const getProductMostSold = async () => {
        try {
            const response = await fetch(`http://${URL}/api/productos/productoMostSold`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            })
            // Manejo de respuestas no autorizadas
            if (response.status === 401) {
              console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
              // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
              return { status: 401, message: 'No autorizado' };
            }
            if (!response.ok) {
              throw new Error('problemas al consultar en la navegacion');
            }
            const data = await response.json();
            console.log(data.response);
            setSold(data.response[0].id_producto)       
            setFrecuencia(data.response[0].frecuencia)      
          } catch (error) {
            let response = { status: 500 }
            console.error('problemas al obtener estados:', error);
            return response          
          }
    }

    //info ventas
    const [info, setInfo] = useState(false)
    
    //producto    
    const [selectedId, setSelectedId] = useState('');
    const [prod, setProd] = useState('')

    const handleSelectionChange = (selection) => {
        console.log(console.log(selection));
        
        // DataGrid's selection model provides an array of selected IDs
        setSelectedId(selection[0] || null); // Only allow single selection
        setProd(selection[0] || null)
    };
    
    const [descripciones, setDescripciones] = useState([])
    
    const columns = [
        { field: 'col0', headerName: 'ID', width: 200},
        { field: 'col1', headerName: 'Tipo', width: 100 },
        { field: 'col2', headerName: 'Descripcion', width: 450 },
        { field: 'col3', headerName: 'Ancho', width: 100 },
        { field: 'col4', headerName: 'Alto', width: 100 },
        { field: 'col5', headerName: 'Derc', width: 80 },
        { field: 'col6', headerName: 'Izq', width: 80 },
        { field: 'col7', headerName: 'stock', width: 100 },
        { field: 'col8', headerName: 'PrecioUnidad', width: 150},
    ]
    
    //Swich
    const [checked, setChecked] = useState(false);
    const handleChangeSwitch = (event) => {
        console.log(event.target.checked)
        setChecked(event.target.checked);
    }
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    
    
    useEffect(()=>{        
        let prods = []
        let ids = []
        let descripcions = []
        tipos.map((ti)=>{
            let descripcion = { label: ti.Descripcion }
            descripcions.push(descripcion)
        })
        setDescripciones(descripcions)
        productos.map((prod)=>{ 
            let id = { label: prod.IdGenerate }
            tipos.map((ti)=>{
                if (prod.Tipo == ti.id) {
                    console.log(prod);
                    let newProd = {
                        id: prod.IdGenerate,
                        col0: prod.IdGenerate, 
                        col1: ti.Tipo, 
                        col2: ti.Descripcion,
                        col3: prod.Ancho,
                        col4: prod.Alto,
                        col5: prod.Derc,
                        col6: prod.Izq,
                        col7: prod.stock,
                        col8: `$ ${prod.Precio_U}`
                    }
                    prods.push(newProd)
                }
            })
            ids.push(id)
        })
        setRows(prods)
        //setids(ids)
        const userView = getLocal('view');
        console.log(userView);
        setview(userView)
        console.log(view);
        console.log(tipos);
        getProductMostSold()
    }, [sold])

    return (
        <div>
            {
                info? <div>
                    <Card sx={{ width: '90%', margin: 'auto', boxShadow: '1px 1px 5px ' }}>
                        <InfoProducts/>
                    </Card>
                </div> : <div></div>
            }
            <Typography sx={{ width: '200px', margin: 'auto', paddingBottom: '40px', paddingTop: '20px'  }} variant='h4' >Ventas </Typography>
            <div style={{ height: 350, width: '100%', margin: 'auto', display: 'grid', gridTemplateColumns: '80% 20%'  }}>         
                <div style={{ height: 350, width: '100%', margin: 'auto', marginTop: '15px' }}>
        
                    <SwitchVentasProd/>
                    
                    <Grid container direction={'row'} gap={4} paddingTop={2} paddingBottom={2} > 
                        <Grid item sx={2} >
                        <Typography variant='h5' >Producto Seleccionado: </Typography> 
                        </Grid>
                        <Grid item sx={2} >
                        <Typography variant='h6' >{selectedId} </Typography> 
                        </Grid>
                        <Grid item sx={2} >
                            <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} disabled={!selectedId} onClick={ async ()=>{ 
                                console.log(prod);
                                
                                setProductoUbi([]) 
                                setProducto([])
                                getTipos()
                                setImgs([]) 
                                let resp = await getProducto(prod)
                                console.log(resp);
                                let res = await getProductoIms(prod)
                                console.log(res);
                                resp ? ( 
                                    setProducto(resp), 
                                    res.status != 500 ? setImgs(res) : setImgs([])  
                                ) : alert('error')
                                    
                                }} >ver</Button>
                        </Grid>
                        <Grid item sx={2}>
                            <Button variant="contained"  sx={{width: '100px', height: '25px', padding: '20px' }} endIcon={<RotateLeftIcon />} onClick={()=>{refresh()}}>refresh</Button>                        </Grid>
                        </Grid>
                    <DataGrid sx={{height: '700px', fontSize: '16px' }} rows={rows} columns={columns}  
                        pageSizeOptions={[5, 10]}
                        checkboxSelection={true}
                        onRowSelectionModelChange={handleSelectionChange}
                        slots={{
                        toolbar: GridToolbar,
                        }}
                        slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                        }} />
                </div>
                <div style={{ height: 350, width: '85%', margin: 'auto',display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', alignItems: 'center', gap: '250px'}}>
                    <Card sx={{ maxWidth: 300, boxShadow: 6}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Productos
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                                {productos.length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Total de Productos en la actualidad
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div>
                                {
                                info? <div>
                                    <Button size="small" onClick={()=>{
                                        setInfo(false)
                                    }}>ocultar mas info</Button>

                                </div> : <div>

                                    <Button size="small" onClick={()=>{
                                        setInfo(true)
                                    }} >ver mas info</Button>
                                </div> }
                            </div>
                        </CardActions>
                    </Card>
                    {
                        sold == null ? 
                            <Card sx={{ maxWidth: 300, boxShadow: 6}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Problemas al identificar el producto
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                                        .
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Total de Productos en la actualidad: .
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                        : 
                        <Card sx={{ maxWidth: 300, boxShadow: 6}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    El producto mas vendido 
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                    {productos[sold].IdGenerate}
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                    Total de ventas realizadas {frecuencia}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <div>
                                    {
                                    producto.length != 0 ? <div>
                                        <Button size="small" onClick={()=>{
                                            refresh()
                                            setInfo(false)
                                        }}>ocultar info</Button>

                                    </div> : <div>

                                        <Button size="small" onClick={ async ()=>{
                                            let resp = await getProducto(productos[sold].IdGenerate)
                                            console.log(resp);
                                            let res = await getProductoIms(productos[sold].IdGenerate)
                                            console.log(res);
                                            resp ? ( 
                                                setProducto(resp), 
                                                res.status != 500 ? setImgs(res) : setImgs([])  
                                            ) : alert('error')
                                        }} >ver mas info</Button>
                                    </div> }
                                </div>
                            </CardActions>
                        </Card>
                    
                    }
                    <Card sx={{  maxWidth: 300, boxShadow: 6}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Tipos
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                                {tipos.length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Total de Tipos en la actualidad
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={()=>{ router('/addtipo') }} >Administrar</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 300, boxShadow: 6}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Galpones
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                                {lugares.length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Total de Galpones en la actualidad
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={()=>{ router('/addlugar') }}>Administrar</Button>
                        </CardActions>
                    </Card>
                </div>    
            </div>
        </div>
        
    );
}