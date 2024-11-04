import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/navBar";
import AddHomeIcon from '@mui/icons-material/AddHome';
import DeleteIcon from '@mui/icons-material/Delete';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const URL = import.meta.env.VITE_BACKEND_URL


export default function AddTipo () {

    const {createTipo, alert, getTipos, tipos, refresh} = useContext(MiContexto)

    const router = useNavigate()

    const [data, setData] = useState({
        Tipo: '',
        Descripcion: ''
    });

    async function dataFrom(event) {
        event.preventDefault();
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }

    useEffect(()=>{
        getTipos()
        console.log(tipos);
        
    }, [])


    return(
        <div>
        <NavBar/>
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '80px', padding: '15px', boxShadow: '2px 2px 10px 2px' }} >
            <Typography variant="h4" gutterBottom sx={{ width:'300px', margin: 'auto' }}  >
                Agregar nuevo tipo
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                    <Grid container direction="column" rowSpacing={1} spacing={5} marginBottom="20px" marginTop="20px">
                        <Grid item xs={8}>
                        <TextField fullWidth label='Tipo' name='Tipo' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={8}>
                        <TextField fullWidth label='Descripcion' name='Descripcion' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                    </Grid>      
            <Grid container direction='row' sx={{ width:'500px', margin: 'auto' }} spacing={5} >
                    <Grid item xs={6}  >
                            <Button type="submit" variant="contained" size="small" sx={{ width:'200px'}} onClick={()=>{
                                refresh()
                                router('/inicio')
                            }}>volver</Button>
                        </Grid>
                    <Grid item xs={6}  >
                    <Button type="submit" variant="contained" size="small" sx={{ width:'200px', margin: 'auto' }} onClick={ async ()=>{
                        console.log(data);
                        let respon = await createTipo(data)
                        console.log(respon.status);
                        if (respon.status == 200) {
                            await getTipos()
                            await alert('success')
                            window.location.reload();
                        }
                    }}  >crear</Button>
                    </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Tipos Existentes
                </Typography>
                <Demo>
                    <List sx={{width: '100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300}}>

                        {
                            tipos.map((tipo, index)=>{
                                return (
                                    <li key={index}  >
                                        <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={ async ()=>{
                                                const response = await fetch(`http://${URL}/api/tipos//deleteTipo/${tipo.id}`,{
                                                    method: 'DELETE',
                                                    headers: {
                                                    'Content-Type': 'application/json'
                                                    },
                                                    credentials: 'include'
                                                })
                                                if (response.status == 200) {
                                                    await alert('success')
                                                    setTimeout( async ()=>{
                                                        await getTipos()
                                                        window.location.reload();
                                                    }, 1500)
                                                }else{
                                                    await alert('error')
                                                }
                                            }} >
                                            <DeleteIcon />
                                            </IconButton>
                                        }
                                        >
                                        <ListItemAvatar>
                                            <Avatar>
                                            <AddHomeIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${tipo.Tipo}`}
                                        />
                                        <ListItemText
                                            primary={`${tipo.Descripcion}`}
                                        />
                                        </ListItem>
                                </li>
                                )}
                            )
                        }
                    </List>
                </Demo>
            </Grid>
            </Box>
        </Box>
        </div>
    )
}
