import { DataGrid, GridToolbar } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { useContext, useEffect, useState } from 'react';
import { MiContexto } from '../../components/context/context';
import {Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from 'react-router-dom';
import InfoVentas from '../../components/infoVentas/infoVentas';
import SwitchVentasProd from '../../components/switch/switchVentasProd';
import ProductosVenta from '../../components/productosVenta/productosVenta';
import NavBar from '../../components/navbar/navBar';
import Venta from '../../components/venta/venta';
import InfoProdVenta from '../../components/productosVenta/infoProdVenta';


const URL = import.meta.env.VITE_BACKEND_URL

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0 // Opcional, dependiendo si querés decimales o no
    }).format(precio);
};


export default function Ventas() {

    const {
        estados,
        setidsVent,
        rowsVent, setRowsVent,
        ventas, setVentas,
        getLugares, getTipos, getEstados,
        getVenta, 
        refreshVenta, 
        switchVentasProd
    } = useContext(MiContexto)

    const router = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const getVentas = async () =>{
        try {
            const response = await fetch(`http://${URL}/api/ventas/getVentas`, {
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
              throw new Error('Problemas al consultar en la navegación');
            }
    
            const data = await response.json();
            console.log(data);
            
            setVentas(data.response);  // Asignar los datos a tu estado
            return data;
          } catch (error) {
            let response = { status: 500 }
            console.error('problemas con la consulta:', error);
            return response
          }
            finally {
            setIsLoading(false); // Terminamos el estado de carga
          }
    }

    //info ventas
    const [info, setInfo] = useState(false)
    
    
    //ventas    
    const [ventid, setVentid] = useState('')
    const [selectedId, setSelectedId] = useState('');

    const handleSelectionChange = (selection) => {
        console.log(console.log(selection));
        
        // DataGrid's selection model provides an array of selected IDs
        setSelectedId(selection[0] || null); // Only allow single selection
        setVentid(selection[0] || null)
    };

    //columnas de tabla
    const columns = [
        { field: 'col0', headerName: 'id_venta', width: 150 },
        { field: 'col1', headerName: 'Fecha', width: 180 },
        { field: 'col2', headerName: 'Nombre', width: 100 },
        { field: 'col3', headerName: 'Apellido', width: 100 },
        { field: 'col4', headerName: 'Mail', width: 180 },
        { field: 'col5', headerName: 'Cel', width: 150 },
        { field: 'col6', headerName: 'Total', width: 150 },
        { field: 'col7', headerName: 'Estado', width: 150 },
        { field: 'col8', headerName: 'estadoDesc', width: 150 },
    ]


    useEffect(()=>{        

        getVentas()            
        getEstados()
        getLugares()
        getTipos()

        let vents = []
        let ids = []
        let em = []
        let newEstados = []
        let telefonosV = []

        estados.map((est)=>{
            newEstados.push(est.estado)
        })
        ventas.map((cliente)=>{ 
            em.push(cliente.email)
            telefonosV.push(cliente.cel)
            estados.map((est) =>{                
                if (cliente.estado == est.id) {
                    let id = { label: cliente.id_venta }
                    let newCliente = {
                        id: cliente.id_venta,
                        col0: cliente.id_venta, 
                        col1: cliente.fecha, 
                        col2: cliente.nombre,
                        col3: cliente.apellido,
                        col4: cliente.email,
                        col5: cliente.cel,
                        col6: `${formatearPrecio(cliente.total)}`,
                        col7: est.estado
                    }
                    
                    if (cliente.estadoDesc == 0 ) {
                        newCliente.col8 = 'sin descuento'
                    }else{
                        newCliente.col8 = 'con descuento'
                    }
                    vents.push(newCliente)
                    ids.push(id)
                }
            })
        })
        setRowsVent(vents)
        setidsVent(ids)

    }, [isLoading, ventid])

    return (
        <div >
            <NavBar/>
            <div>
            
            <div>
                {switchVentasProd ? <div>
                        <div style={{ width: '95%', margin: 'auto' }} >
                            <div>
                                <Venta/>
                            </div>
                            <div style={{ width: '100%', marginTop: '50px' }}>
                                {
                                    info? <div>
                                        <Card sx={{ width: '90%', margin: 'auto', boxShadow: '1px 1px 5px ' }} >
                                            <InfoVentas/>
                                        </Card>
                                    </div> : <div></div>
                                }
                                <Typography sx={{ width: '200px', margin: 'auto', paddingBottom: '40px', paddingTop: '20px' }} variant='h4' >Ventas</Typography>
                                <div style={{height: '900px' , width: '100%', margin: 'auto', display: 'grid', gridTemplateColumns: '80% 20%'  }}>
                                    <div style={{ height: 350, width: '100%', margin: 'auto', marginTop: '15px' }}>
                                        <Grid container direction='row' gap={6} >
                                            <Button variant="contained" color="info" startIcon={<ReplyIcon/>} sx={{width: '300px', height: '40px', marginBottom: '15px' , paddingRight: '50px' }} onClick={ async ()=>{
                                                
                                                router('/productos')
                                                
                                            }}>Gestor de Productos</Button>

                                        </Grid>
                                        <SwitchVentasProd/>
                                        
                                        <Grid container direction={'row'} gap={4} paddingTop={2} paddingBottom={2} >
                                            <Grid item sx={2}>
                                                <Typography variant='h5' >Venta Seleccionada: </Typography> 
                                            </Grid>
                                            <Grid item sx={2}>
                                                <Typography variant='h6' >{selectedId} </Typography> 
                                            </Grid>
                                            <Grid item sx={2}>
                                                <Button variant="contained"  sx={{padding: '12px' }} endIcon={<SearchIcon />} disabled={!selectedId} onClick={ async ()=>{ 
                                                    await getVenta(ventid)
                                                    //console.log(res);
                                                    }} >ver</Button>
                                            </Grid>
                                            <Grid item sx={2}>
                                                <Button variant="contained" endIcon={<RotateLeftIcon />} sx={{width: '100px', height: '25px', padding: '25px' }} onClick={()=>{
                                                    setVentid('')
                                                    setSelectedId('')
                                                    refreshVenta()
                                                    }}>refresh</Button>
                                            </Grid>
                                        </Grid>
                                        {isLoading ? 
                                        <p>Cargando ventas...</p>
                                        
                                        : 
                                        
                                        <DataGrid sx={{height: '500px'}} rows={rowsVent} columns={columns} 
                                        pageSizeOptions={[5, 10]}
                                        checkboxSelection={true}
                                        disableMultipleRowSelection={true}
                                        onRowSelectionModelChange={handleSelectionChange}
                                        slots={{
                                        toolbar: GridToolbar,
                                        }}
                                        slotProps={{
                                        toolbar: {
                                            showQuickFilter: true,
                                        },
                                        }} />
                                        
                                        }
                                    </div>
                                    <div style={{ height: 350, width: '85%', margin: 'auto', marginTop: '200px' ,display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', alignItems: 'center', gap: '250px'}}>
                                        <Card sx={{ maxWidth: 300, boxShadow: 6}}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                Ventas
                                                </Typography>
                                                <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                                                    {ventas.length}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Total de Ventas en la actualidad
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
                                        
                                    </div>
                                </div>
                            </div> 
                        </div>

                    </div> : 
                    <div>
                        <div style={{ width: '95%', margin: 'auto' }} >
                            <div>
                                <InfoProdVenta/>
                            </div> 
                            <div style={{ width: '100%', marginTop: '50px' }}>
                                <ProductosVenta/>
                            </div>
                        </div>
                    </div> }
            </div>    
            
        
            </div>
        </div>
    );
}