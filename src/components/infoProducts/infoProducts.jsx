
import { useContext, useEffect, useState} from "react"
import { MiContexto } from "../context/context"
//import { useNavigate } from "react-router-dom";

//
import { BarChart } from '@mui/x-charts/BarChart';
import { Button, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

//icon
import RotateLeftIcon from '@mui/icons-material/RotateLeft';


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
export default function InfoProducts() {
    const {lugares, tipos, productos} = useContext(MiContexto)

    //const router = useNavigate()
    const [tipo, setTipo] = useState('')
    const [xaxis, setXaxis] = useState([])
    const [series, setSeries] = useState([])
    const createMetricas = (max, min, tipo) =>{
        let x = []
        let s = []
        productos.map((p)=>{
            if (tipo == ''){
                if (p.stock >= max && p.stock <= min ) {                
                    x.push(p.IdGenerate)
                    s.push(p.stock)
                }
            }else{
                if (p.stock >= max && p.stock <= min && p.Tipo == tipo ) {                
                    x.push(p.IdGenerate)
                    s.push(p.stock)
                }
            }
        })
        console.log(s);
        setXaxis(x)
        setSeries(s)
    }
    
    //set tipos 
    const handleChange = (event) => {
        console.log(event.target.value)
        setTipo(event.target.value)
    }
    //set mayor 
    
    const [max, setMax] = useState(0)
    const handleChangeMayor = (event) => {
        setMax(event.target.value)
    }
    //set menor 
    const [min, setMin] = useState(100)
    const handleChangeMenor = (event) => {
        setMin(event.target.value)
    }

    useEffect(()=>{        
        console.log(lugares);
        console.log(tipos);
        console.log(productos); 
        createMetricas(max, min, tipo)
             
    }, [max, min, tipo])

    return (
        <div style={{ margin:'auto', width: '95%', marginTop: '50px' }} >
            <Card sx={{ minWidth: 275 }}>
                <Typography variant="h5" >Filtrar Productos</Typography>
                <CardContent sx={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', alignItems: 'center', gap: '50px'}}>
                    <FormControl >
                        <InputLabel id="demo-select-small-label" sx={{ fontSize: '15px' }} variant='outlined' size='small'>Tipos</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={tipo}
                        onChange={handleChange}
                        MenuProps={MenuProps}
                        style={{width: '250px', height: '45px'}}
                        >
                        {tipos.map((name, index) => (
                            <MenuItem
                            key={index}
                            value={name.id}
                            >
                            {name.Tipo}
                            </MenuItem>
                        ))}
                        </Select>    
                    </FormControl>
                    <FormControl >
                        <Typography variant="h6" >stock</Typography>
                        <TextField id="outlined-basic" label="menor" variant="outlined" placeholder={min} onChange={handleChangeMenor}/> 
                    </FormControl>
                    <FormControl >
                        <Typography variant="h6" >stock</Typography>
                        <TextField id="outlined-basic" label="mayor" variant="outlined" onChange={handleChangeMayor} /> 
                    </FormControl>
                    <Button variant="contained" sx={{width: '20%'}} size="large" onClick={()=>{
                        setTipo('')
                        setMax(0)
                        setMin(100)
                    }} ><RotateLeftIcon/></Button>
                </CardContent>
                <CardActions>
                    <Typography variant="h6" >
                        Productos con Stock menor a:    
                    </Typography>
                    <Typography variant="h4" > {min} </Typography>
                    <Typography variant="h6" >
                       y mayor a:   
                    </Typography>
                    <Typography variant="h4" > {max} </Typography>
                </CardActions>
            </Card>
            <Typography variant="h5" >Stock</Typography>
            <BarChart
            xAxis={[{ scaleType: 'band', data: xaxis }]}
            series={[ { data: series } ] }
            width={1400}
            height={300}
            />
            <Typography sx={{ display: 'flex', marginTop: '-25px', marginLeft: '15px' }} variant="h7" >ID DE PRODUCTO</Typography>

        </div>
    ) 
}
