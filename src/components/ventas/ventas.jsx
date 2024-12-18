import { DataGrid } from '@mui/x-data-grid';
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
    const handleChangeProd = (event) => {
        //console.log(event.target.innerText)
        setVentid(event.target.innerText)
    }

    //set email 
    const handleChangeEmail = (event) => {
        //console.log(event.target.innerText)
        setEmail(event.target.innerText)
    }
    //set estado 
    const handleChangeTelefono = (event) => {
        //console.log(event.target.innerText)
        setTelV(event.target.innerText)
    }
    //set estado 
    const handleChangeEstado = (event) => {
        //console.log(event.target.innerText)
        setEstadoV(event.target.innerText)
    }


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
                        id: cliente.id,
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
                    <Grid container direction='row' gap={2} >
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
                        }}>productos</Button>
                        <Button variant="contained" endIcon={<RotateLeftIcon />} sx={{width: '100px', height: '25px', padding: '20px' }} onClick={()=>{refreshVenta()}}>refresh</Button>
                    </Grid>            
                    <Grid sx={{ display: {xs: 'none', md: 'grid', gridTemplateColumns: `repeat(4, 1fr)`, alignItems:'center', gap: '15px'}}} container>
                        <Grid item xs={6} >
                            <FormControl sx={{ marginTop: '15px', width: '100%'}}>
                            <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={emails}
                            sx={{ width: 300 }}
                            onChange={handleChangeEmail}
                            renderInput={(params) => <TextField {...params} label="Email's" />}
                            />  
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} >
                            <FormControl sx={{ marginTop: '15px', width: '100%'}}>
                            <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={telefonosV}
                            sx={{ width: 300 }}
                            onChange={handleChangeTelefono}
                            renderInput={(params) => <TextField {...params} label="telefonos" />}
                            />  
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} >
                            <FormControl sx={{ marginTop: '15px', width: '100%'}}>
                            <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={estadosV}
                            sx={{ width: 300 }}
                            onChange={handleChangeEstado}
                            renderInput={(params) => <TextField {...params} label="Estados" />}
                            />  
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} onClick={ async ()=>{ 
                                let vent = await filtrarEmail(email, estadoV, telV) 
                                if (vent.length != 0 ){
                                    setRowsVent(vent)
                                }else{
                                    alert('error')
                                }
                                }} >filtrar</Button>
                        </Grid>
                        
                        <Grid item xs={6}>
                            <FormControl sx={{ marginTop: '15px' , width: '100%', paddingBottom: '25px'}}>
                            <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={idsvent}
                            sx={{ width: 300 }}
                            onChange={handleChangeProd}
                            renderInput={(params) => <TextField {...params} label="ID's" />}
                            />  
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained"  sx={{padding: '12px' }} endIcon={<SearchIcon />} onClick={ async ()=>{ 
                                await getVenta(ventid)
                                //console.log(res);
                                }} >ver</Button>
                        </Grid>
                    </Grid>
                    <DataGrid sx={{height: '500px'}} rows={rowsVent} columns={columns}  />
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