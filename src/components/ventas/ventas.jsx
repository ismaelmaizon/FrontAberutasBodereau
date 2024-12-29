import { DataGrid, GridToolbar } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { useContext, useEffect, useState } from 'react';
import { MiContexto } from '../context/context';
import { Autocomplete, Button, Card, CardActions, CardContent, FormControl, Grid, TextField, Typography } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';
import ReplyIcon from '@mui/icons-material/Reply';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import InfoVentas from '../infoVentas/infoVentas';
import SwitchVentasProd from '../switch/switchVentasProd';


export default function Ventas() {

    const {
        estados,
        idsvent, setidsVent,
        setVprod, setVent,
        rowsVent, setRowsVent,
        ventas, getProductos, getLugares, getTipos,
        getVenta, emails, setEmails, email, setEmail, estadoV, setEstadoV, estadosV, setEstadosV, telV, setTelV, telefonosV, setTelefonosV,
        refreshVenta, filtrarEmail,
        alert
    } = useContext(MiContexto)

    const router = useNavigate()
    //info ventas
    const [info, setInfo] = useState(false)
    
    
    //ventas    
    const [ventid, setVentid] = useState('')
    const [selectedId, setSelectedId] = useState('*****');

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
    ]


    useEffect(()=>{
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
                        col6: `$ ${cliente.total}`,
                        col7: est.estado
                    }
                    vents.push(newCliente)
                    ids.push(id)
                }
            })
        })
        setRowsVent(vents)
        setidsVent(ids)
        setEmails(em)
        setEstadosV(newEstados)
        setTelefonosV(telefonosV)
        
    }, [])

    return (
        <div>
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
                        <Button variant="contained" color="info" startIcon={<ReplyIcon/>} sx={{width: '150px', height: '25px', padding: '20px' }} onClick={ async ()=>{
                            let res = await getProductos()
                            //console.log(res);
                            if(res.status == 401){
                                Swal.fire({
                                    position: "center",
                                    icon: "error",
                                    title: "su session expiro",
                                    showConfirmButton: false,
                                    timer: 1500
                                    });
                                router('/')
                            }else{
                                await getLugares()
                                await getTipos()
                                setVprod(true)       
                                setVent(false)    
                            }
                        }}>Gestor de Prod.</Button>

                    </Grid>            
                    <SwitchVentasProd/>
                    <Grid sx={{ display: {xs: 'none', md: 'grid', gridTemplateColumns: `repeat(5, 1fr)`, alignItems:'center', gap: '15px', marginTop: '25px', marginBottom: '25px'}}} container>
                        <Grid item>
                            <Typography variant='h5'  >Venta Seleccionada: </Typography> 
                            <Typography variant='h6' > {selectedId} </Typography> 

                        </Grid>
                        <Grid item container gap={5}>
                            <Grid>
                                <Button variant="contained"  sx={{padding: '12px' }} endIcon={<SearchIcon />} disabled={!selectedId} onClick={ async ()=>{ 
                                    await getVenta(ventid)
                                    //console.log(res);
                                    }} >ver</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" endIcon={<RotateLeftIcon />} sx={{width: '100px', height: '25px', padding: '25px' }} onClick={()=>{refreshVenta()}}>refresh</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <DataGrid sx={{height: '500px'}} rows={rowsVent} columns={columns} 
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
    );
}