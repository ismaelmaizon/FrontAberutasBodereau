import { Grid, Switch, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MiContexto } from "../context/context";


export default function SwitchVentasProd () {

    const {getProductos,  getVentas, getLugares, getEstados, getTipos, 
        setVprod, setVent
    } = useContext(MiContexto)
    
    const [checked, setChecked] = useState(true);

    const handleChange = async (event) => {
    setChecked(event.target.checked);
    console.log(checked);
    checked ? ( 
        await getProductos(), await getEstados(),
        await getLugares(),
        await getTipos(),
        setVprod(true) ) 
        :
        (
            await getVentas(),
            await getEstados(),
            await getLugares(),
            await getTipos(),
            setVent(true) 
        )
    
    };


    return(
        <div>
            <Grid container direction='row' >
                <Grid xs={1} >
                    <Typography>prod <ArrowBackIcon/></Typography>
                   
                </Grid>    
                
                <Grid xs={1} >
                    <Switch
                        size="medium"
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />        
                </Grid>    
                
                <Grid xs={1}>
                    <Typography><ArrowForwardIcon/> Vent</Typography>
                </Grid>    
                    
            </Grid>
        </div>
    )
}
