import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../../components/context/context.jsx";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/navBar.jsx";
import AddHomeIcon from '@mui/icons-material/AddHome';
import DeleteIcon from '@mui/icons-material/Delete';



  
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
const URL = import.meta.env.VITE_BACKEND_URL


export default function AddLugar () {

    const {createLugar, getLugares , lugares , alert, refresh} = useContext(MiContexto)

    const router = useNavigate()

    const [data, setData] = useState({
        fullname: ''
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
        getLugares()
        console.log(lugares);
        
    }, [])

    return(
        <div>
        <NavBar/>
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px', boxShadow: '2px 2px 10px 2px' }} >
            <Typography variant="h4" gutterBottom sx={{ width:'200px', margin: 'auto' }}>
                Nuevo Lugar
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                    <Grid container direction="column" rowSpacing={1} spacing={5} marginBottom="20px" marginTop="20px" > 
                        <Grid item xs={8}>
                        <TextField fullWidth label='Ingrese nuevo lugar' name='fullname' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                    </Grid>
            <Grid container direction ='row' sx={{ width:'500px', margin: 'auto' }} spacing={5} >
                    <Grid item xs={6}  >
                        <Button type="submit" variant="contained" size="small" sx={{ width:'200px'}} onClick={()=>{
                            refresh()
                            router('/inicio')
                        }}>volver</Button>
                    </Grid>
                    <Grid item xs={6}  >
                    <Button type="submit" variant="contained" size="small" sx={{ width:'200px', margin: 'auto' }}  onClick={ async ()=>{
                        console.log(data);
                        let respon = await createLugar(data)
                        console.log(respon.status);
                        if (respon.status == 200) {
                            await getLugares()
                            await alert('success')
                            window.location.reload();
                        }
                    }} >crear</Button>
                    </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Lugares Existentes
                </Typography>
                <Demo>
                    <List sx={{width: '100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300}}>
                        {
                            lugares.map((lugar, index)=>{
                                return (
                                    <li key={index}>
                                        <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete"  onClick={ async ()=>{
                                                const response = await fetch(`http://${URL}/api/lugares/lugares/${lugar.id}`,{
                                                    method: 'DELETE',
                                                    headers: {
                                                    'Content-Type': 'application/json'
                                                    },
                                                    credentials: 'include'
                                                })
                                                if (response.status == 200) {
                                                    await alert('success')
                                                    setTimeout( async ()=>{
                                                        await getLugares()
                                                        window.location.reload();
                                                    }, 1500)
                                                }else{
                                                    await alert('error')
                                                }
                                                        
                                            }}  >
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
                                            primary={lugar.fullname}
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