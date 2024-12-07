
import { useContext, useEffect, useState} from "react"
import { MiContexto } from "../context/context"
//import { useNavigate } from "react-router-dom";

//
import { BarChart } from '@mui/x-charts/BarChart';
import {Button, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";


//
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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
export default function InfoVentas() {
    //context
    const {ventas, estados, estadosV} = useContext(MiContexto)

    //constantes
    const [ventasMetricas, setVentasMetricas] = useState([]);
    const [ventasMetricasPrecio, setVentasMetricasPrecio] = useState([]);
    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [date, setDate] = useState('');
    const [date2, setDate2] = useState('');


    const createMetricas = (fechaInicio, fechaFin, estado) =>{
        console.log(estado);
        
        let x = []
        if (estado == '') {
            if(fechaInicio == '' || fechaFin == '' ){
                setVentasMetricas(ventas)
                setVentasMetricasPrecio([])

            }else{
                const inicio = new Date(fechaInicio);
                const fin = new Date(fechaFin);
                // Filtramos el array original y creamos un nuevo array con los elementos que cumplen la condición
                let v = ventas.filter(elemento => {
                    let fechaElement = new Date(elemento.fecha);
                    if(fechaElement >= inicio && fechaElement <= fin){
                        console.log(elemento);
                        let num = parseInt(elemento.total) / 1000 
                        console.log(num);   
                        x.push(num)
                        return elemento
                    } 
                });
                setVentasMetricas(v)
                setVentasMetricasPrecio(x)
            }    
        }else{
            let est = 0
            estados.map((e)=>{
                if (e.estado == estado) {
                    est = e.id
                }
            })
            if(fechaInicio == '' || fechaFin == '' ){
                setVentasMetricas(ventas)
            }else{
                const inicio = new Date(fechaInicio);
                const fin = new Date(fechaFin);
                // Filtramos el array original y creamos un nuevo array con los elementos que cumplen la condición
                let v = ventas.filter(elemento => {
                    let fechaElement = new Date(elemento.fecha);
                    if(fechaElement >= inicio && fechaElement <= fin && elemento.estado == est){
                        console.log(elemento);
                        let num = parseInt(elemento.total) / 1000 
                        console.log(num);   
                        x.push(num)
                        return elemento
                    } 
                });
                setVentasMetricas(v)
                setVentasMetricasPrecio(x)
            }    
        }
    }
     
    const [estado, setEstado] = useState(0)
    //set estado 
    const handleChangeEstado = (event) => {
        //console.log(event.target.innerText)
        setEstado(event.target.value)
        console.log(event.target.value)
    }

    useEffect(()=>{
        createMetricas(date, date2, estado)
        console.log(ventas);
        console.log(ventasMetricas);
        console.log(estados);
        console.log(estadosV);
    }, [date,date2, estado])


    return (
        <div style={{ margin:'auto', width: '95%', marginTop: '50px' }} >
            <Card sx={{ minWidth: 275 }} >
                <Typography variant="h5">Filtrar Ventas</Typography>
                <CardContent sx={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', alignItems: 'center'}} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={value} onChange={(newValue) => {
                                let date1 = `${newValue.$y}-${newValue.$M + 1 }-${newValue.$D}`
                                console.log(date1);
                                setDate(date1)
                                setValue(value)}} />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={value2} onChange={(newValue2) => {
                                let date2 = `${newValue2.$y}-${newValue2.$M + 1}-${newValue2.$D}`
                                console.log(date2);
                                setDate2(date2)
                                setValue2(value2)}} />
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl sx={{ width: '100%'}}>
                        <InputLabel id="demo-select-small-label" sx={{ fontSize: '15px' }} variant='outlined' size='small'>Estados</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={estado}
                        onChange={handleChangeEstado}
                        MenuProps={MenuProps}
                        style={{width: '250px', height: '45px'}}
                        >
                        {estados.map((el, index) => (
                            <MenuItem
                            key={index}
                            value={el.estado}
                            >
                            {el.estado}
                            </MenuItem>
                        ))}
                       </Select>    
                    </FormControl>
                    <Button variant="contained" sx={{width: '20%'}} size="large" onClick={()=>{
                            setDate('')
                            setValue(null)
                            setDate2('')
                            setValue2(null)
                            setEstado('')
                            setVentasMetricas([])
                            setVentasMetricasPrecio([])
                        }} ><RotateLeftIcon/>
                    </Button>
                </CardContent>
                <CardActions sx={{paddingTop: '5px'}} >
                    <Typography variant="h6" >
                        desde:   
                    </Typography>
                    <Typography variant="h4" > {date} </Typography>
                    <Typography variant="h6" >
                       hasta:   
                    </Typography>
                    <Typography variant="h4" > {date2} </Typography>
                    {ventasMetricasPrecio.length == 0 ? <div>
                        <Typography variant="h6" >
                        Total de ventas en el periodo: 0
                        </Typography>
                    </div>:<div>
                        <Typography variant="h6" >
                        Total de ventas en el periodo: {ventasMetricasPrecio.length}
                        </Typography>
                    </div>}
                </CardActions>
            </Card>
            <Typography variant="h5" >Valores de a mil</Typography>
            {
                date2 == '' ? <div>
                    <BarChart
                        sx={{marginLeft: '50px'}}
                        xAxis={[{ scaleType: 'band', data: ['ventas'] }]}
                        series={[ { data: ventasMetricasPrecio } ] }
                        width={1300}
                        height={300}
                        />
                </div>:
                <div>
                    <BarChart
                        sx={{marginLeft: '50px'}}
                        xAxis={[{ scaleType: 'band', data: ventasMetricas.map((v)=>{ return v.id_venta }) }]}
                        series={[ { data: ventasMetricasPrecio } ] }
                        width={1300}
                        height={300}
                        />
                </div>

            }
            <Typography sx={{ display: 'flex', marginTop: '-35px', marginLeft: '15px', marginBottom: '25px' }} variant="h7" >ID DE VENTA</Typography>
        </div>
    ) 
}
