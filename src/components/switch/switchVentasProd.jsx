import { Grid, Switch, Typography } from "@mui/material";
import { useContext } from "react";
import { MiContexto } from "../context/context";


export default function SwitchVentasProd () {

    const {
        switchVentasProd, setSwitchVentasProd,
        getLugares, getEstados, getTipos
    } = useContext(MiContexto)
    
    const handleChange = async (event) => {
    
        console.log(switchVentasProd);
        
        setSwitchVentasProd(event.target.checked);
        console.log(switchVentasProd);
        switchVentasProd ? ( 
            await getEstados(),
            await getLugares(),
            await getTipos()
            ) 
            :
            (
            await getEstados(),
            await getLugares(),
            await getTipos()
                
            )
    
    };


    return(
        <div>
            <Grid container direction='row' alignItems={'center'}  >
                <Grid item xs={1} >
                    <Typography variant="h5" >Productos</Typography>
                </Grid>    
                <Grid item xs={1}>
                    <div style={{ paddingLeft: '25px' }} >
                        <Switch
                            size="medium"
                            checked={switchVentasProd}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />             
                    </div>
                </Grid>    
                
                <Grid item xs={8}>
                    <Typography variant="h5" > Ventas</Typography>
                </Grid>    
                    
            </Grid>
        </div>
    )
}
