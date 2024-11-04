import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Fragment,useContext,useState } from 'react';
import { Button, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
//import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { MiContexto } from '../context/context';
import { useNavigate } from 'react-router-dom';

const URL = import.meta.env.VITE_BACKEND_URL


export default function NavBar() {

    const { cart } = useContext(MiContexto)
    const router = useNavigate()
    //despliegue getProductosLugar
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };    
    const links = [
      {text: 'Agregar Producto', url: '/addproducto', icon: BorderColorIcon },
      {text: 'Agregar Lugar', url: '/addlugar', icon: AddLocationIcon },
      {text: 'Agregar Tipo', url: '/addtipo', icon: AddIcon },
    ]
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {links.map((link, index) => {
            const Icon = link.icon
            return(
            <ListItem key={index} disablePadding>
              <Link to = {link.url} >
                <ListItemButton >
                  <ListItemIcon>
                     <Icon/>
                  </ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </Link>  
            </ListItem>)
          })}
        </List>
      </Box>
    );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
              <Fragment>
                <Button sx={{color:'white'}} onClick={toggleDrawer('left', true)}><DensityMediumIcon/></Button>
                <Drawer
                  anchor={'left'}
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                >
                  {list('left')}
                </Drawer>
              </Fragment>
          </div>
          <Grid container direction={'row'} alignItems={'flex-end'}  >
            <Grid item xs={6.5} >
                <Button onClick={()=>{ router('/inicio') }} >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color={'white'}
                  >
                        Aberturas Bodereau
                  </Typography>
                </Button> 
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color='success' onClick={()=>{ router('/addproducto') }} >
                  <Typography
                    variant="h9"
                    noWrap
                    component="div"
                    color={'white'}
                  >
                    Agregar producto
                  </Typography>
                </Button>  
            </Grid>
            <Grid item xs={1.5}>
                <Button variant="contained" color='success' onClick={()=>{ router('/addtipo') }} >
                  <Typography
                    variant="h9"
                    noWrap
                    component="div"
                    color={'white'}
                  >
                    Agregar tipo
                  </Typography>
                </Button> 
            </Grid>
            <Grid item xs={1}>
                <Button variant="contained" color='success' onClick={()=>{ router('/addlugar') }} >
                  <Typography
                    variant="h9"
                    noWrap
                    component="div"
                    color={'white'}
                  >
                    Agregar Lugar
                  </Typography>
                </Button> 
            </Grid>
          </Grid>
           
          <Box sx={{ flexGrow: 1 }} /> {/* sirve para generar el espacio */ }
          
          <Link to={'/preview'} >
            <Button sx={{color: 'white'}}>
                <AddShoppingCartIcon/> {cart.length}
            </Button>
          </Link>
          <Button sx={{color: 'white'}} onClick={ async () =>{
            try {
              const response = await fetch(`http://${URL}/api/logins/logout`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include'
              });
              if (response.status != 401) {
                router('/inicio')
              }else{
                console.log(response);
                localStorage.clear()
                router('/')
              }
              console.log(response.status);                    
            } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
            }
          } } > <LogoutIcon/> </Button>
          
        </Toolbar>
      </AppBar>
      {/*renderMobileMenu*/}
      {/*renderMenu*/}
    </Box>
  );
}
