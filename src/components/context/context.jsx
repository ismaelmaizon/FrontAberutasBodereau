/* eslint-disable no-mixed-spaces-and-tabs */
// contexto

import { useState } from "react";
import { createContext } from "react";
//alert
import Swal from 'sweetalert2'

export const MiContexto = createContext([])

const URL = import.meta.env.VITE_BACKEND_URL


 
const CartProvider = ( { children } ) => {
  //vista
  const [vprod, setVprod] = useState(false)
  const [vent, setVent] = useState(false)
  
  //get cookie
  const [view, setview] = useState('')
  const getLocal = (name) => {
    const value = localStorage.getItem(name)
    console.log(value);
    
    if (value != null) {  
      return value
    }
    return null;
  }
  //obtener estados
  const [estados, setEstados] = useState([])
  const getEstados = async () =>{
    try {
        const response = await fetch(`http://${URL}/api/estados/getEstados`,{
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
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        setEstados(data.response)        
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas al obtener estados:', error);
        return response          
      }
  }

  //crear tipo
  //const [prodCreado, setPructoCreado] = useState(false)
  const createTipo = async ( data ) =>{
      let tipo = {
        Tipo: data.Tipo,
        Descripcion: data.Descripcion 
      }
      try {
        const response = await fetch( `http://${URL}/api/tipos/createTipo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tipo),
          credentials: 'include'
        });
        // Manejo de respuestas no autorizadas
        if (response.status === 401) {
          console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
          // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
          return { status: 401, message: 'No autorizado' };
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas al crear tipo:', error);
        return response          
    }
  }
  //obtener tipos
  const [tipos, setTipos] = useState([])
  const getTipos = async () =>{
    try {
        const response = await fetch(`http://${URL}/api/tipos/getTipos`,{
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
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        setTipos(data.response)        
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas al obtener tipos:', error);
        return response          
      }
  }

  //crear nuevo lugar
  const createLugar = async (data) =>{
    let lugar = {
      fullname: data.fullname
    }
    try {
      const response = await fetch(`http://${URL}/api/lugares/lugares`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lugar),credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas al crear lugar:', error);
      return response    
    } 
  }
  //obtener lugares
  const [lugares, setLugares] = useState([])
  const getLugares = async () =>{
      try {
          const response = await fetch(`http://${URL}/api/lugares/lugares`, {
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
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setLugares(data.response)          
        } catch (error) {
          let response = { status: 500 }
          console.error('problemas al obtener lugares:', error);
          return response            
        }
  }

  //obtener productos
  const [productos, setProductos] = useState([])
  const getProductos = async () =>{
      try {
          const response = await fetch(`http://${URL}/api/productos/productos`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

           // Manejo de respuestas no autorizadas
          if (response.status === 401) {
            console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
            // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
            return { status: 401, message: 'No autorizado' };
          }
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setProductos(data.response)
              
          return response
        } catch (error) {
          let response = { status: 500 }
          console.error('problemas al obtener productos:', error);
          return response        
        }
      
  }
  //obtener producto
  const [idg, setIdg] = useState('')
  const [producto, setProducto] = useState([])
  const getProducto = async (id) =>{
      try {
          const response = await fetch(`http://${URL}/api/productos/producto/${id}`, {
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
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setIdg(data.IdGenerate)
          return data
        } catch (error) {
          let response = { status: 500 }
          console.error('problemas al obtener producto:', error);
          return response             
        }
      
  }
  //obtener ubicacion de productos
  const [productoUbi, setProductoUbi] = useState([])
  const [infoprod, setInfoprod] = useState([])
  const getUbiProducto = async (id) =>{
    try {
        const response = await fetch(`http://${URL}/api/lugaresProd/getUbicacionProducto/${id}`, {
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
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        if (data.response == []) {
          return []
        }else{
          setProductoUbi(data.response)
          return data.response
        }
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas con la consulta:', error);
        return response                   
      }
  }
  //obtener productos de un lugar
  const [productsLug, setProductsLug] = useState([])
  const getProductosLugar = async (id) =>{
    try {
          const response = await fetch(`http://${URL}/api/lugaresProd/getProductosLugar/${id}`, {
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
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setProductsLug(data.response)
          return data.response
        } catch (error) {
          let response = { status: 500 }
          console.error('problemas con la consulta:', error);
          return response           
        }
  }
  //eliminar productos de un lugar
  const deleteProductoLugar = async (id) =>{
    console.log(id);
    
    try {
      const response = await fetch(`http://${URL}/api/lugaresProd/deleteProductoLugar/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }

  //crear producto
  //const [prodCreado, setPructoCreado] = useState(false)
  const createProducto = async ( data, file ) =>{
    let prod = {
      Tipo: data.Tipo,
      Alto: data.Alto,
      Ancho: data.Ancho,
      Derc: '',
      Izq: '',
      Precio_U: data.Precio_U}
    if (data.Lado == 'Derc'){
      prod.Derc = 1
      prod.Izq = 0
    }else{
      prod.Derc = 0
      prod.Izq = 1
    }  
    console.log(data);
    console.log(file);
    
    
    try {
      const formData = new FormData();
      formData.append('file',file); // 'archivo' debe ser el archivo que deseas enviar
      formData.append('prod', JSON.stringify(prod)); // Puedes agregar otros datos como un JSON stringificado

      const response = await fetch(`http://${URL}/api/productos/producto`, {
        method: 'POST',
        body: formData, 
        credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      
      setVprod(false)
      return {response, data}
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response 
    }
  }
  //actualizar producto
  const actualizarProducto = async ( data ) =>{
    let prod = {
      IdGenerate: data.IdGenerate,
      Tipo: data.Tipo,
      Alto: data.Alto,
      Ancho: data.Ancho,
      Derc: '',
      Izq: '',
      Precio_U: data.Precio_U}
    if (data.Lado == 'Derc'){
      prod.Derc = 1
      prod.Izq = 0
    }else{
      prod.Derc = 0
      prod.Izq = 1
    }  
    console.log(data);
    console.log(prod);
    
    try {
      
      const response = await fetch(`http://${URL}/api/productos/updateProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prod), 
        credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //setVprod(false)
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response 
    }
  }
  //agregar imagen a producto
  const addimgProduct = async ( id, file ) =>{
    console.log(id);
    console.log(file);
    try {
      const formData = new FormData();
      formData.append('file',file); // 'archivo' debe ser el archivo que deseas enviar
      formData.append('id', JSON.stringify(id)); // Puedes agregar otros datos como un JSON stringificado

      const response = await fetch(`http://${URL}/api/productos/addimgProduct`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response 
    }
  }
  //obtener imagenes del producto
  const [imgs, setImgs] = useState([])
  const getProductoIms = async (id) =>{
    try {
      const response = await fetch(`http://${URL}/api/productos/productoimg/${id}`, {
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
        throw new Error('problemas al consultar en la navegacion');
      }
      const data = await response.json();
      return data
      } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response     
    }  
  }
  //eliminar producto
  const deleteProducto = async (id) => {
    try {
      const response = await fetch(`http://${URL}/api/productos/producto/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      setVprod(false)
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }
  //eliminar imagen de producto
  const deleteProductoImg = async (id) => {
    try {
      const response = await fetch(`http://${URL}/api/productos/deleteproductoImg/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },credentials: 'include'
      });
      
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }
  //añadir producto a un lugar
  const insertProdLug = async (data) => {
    const {Idg, stock, Lugar} =  data
    let info = {
      "id_lugar": Lugar,
      "stock": stock
    }
    try {
      const response = await fetch(`http://${URL}/api/lugaresProd/addProductoLugar/${Idg}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info), credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }
  //actulizar producto en un lugar
  const updateproductolugar = async (data) => {
    const {Idg, stock, Lugar, procedimiento} =  data
    let info = {
      "id_lugar": Lugar,
      "stock": stock,
      "procedimiento": procedimiento,
    }
    try {
      const response = await fetch(`http://${URL}/api/lugaresProd/updateProductoLugar/${Idg}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info), credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      /*
      console.log(response.status);
      if( response.status == 200) {
        setVprod(false) 
      } */
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }
  //actualizar stock del producto
  const updateStockProduct = async (id) =>{
    console.log(id);
    
    try {
      const response = await fetch(`http://${URL}/api/lugaresProd/upDateStockProducto/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }

  // Filtro productos
  // rows (filas de la tabla) 
  const [rows, setRows] = useState([])
  const filtrarTipoLadoLug = async (tipo, lado, lug, descr) => {
    
    if (descr != '' ) {
      console.log(descr);
      tipos.map((ti)=>{
        console.log(ti.Descripcion);
        console.log(descr);
        if(ti.Descripcion === descr){
          tipo = ti.id
          console.log(tipo);
          
        }
      })
      console.log(tipo);
    }

    setRows([]);
    let prods = [];
    
    const addProduct = (prod) => {      
        tipos.map((ti)=>{
          if (prod.Tipo == ti.id) {
            prods.push({
                id: prod.id,
                col0: prod.IdGenerate,
                col1: ti.Tipo,
                col2: ti.Descripcion,
                col3: prod.Ancho,
                col4: prod.Alto,
                col5: prod.Derc,
                col6: prod.Izq,
                col7: prod.stock,
                col8: prod.Precio_U
            });  
        } 
      })
    };

    const filterByLugar = async (lug) => {
        const response = await getProductosLugar(lug);
        response.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id) addProduct(prod);
            });
        });
    };

    const filterByTipo = () => {
        productos.forEach(prod => {
            if (tipo === prod.Tipo) addProduct(prod);
        });
    };

    const filterByLado = () => {
        productos.forEach(prod => {
            if ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1)) addProduct(prod);
        });
    };

    const filterByTipoYLado = () => {
        productos.forEach(prod => {
            if ((lado === 'Derc' && prod.Derc === 1 && tipo === prod.Tipo) || (lado === 'Izq' && prod.Izq === 1 && tipo === prod.Tipo)) addProduct(prod);
        });
    };

    const filterByLugarYTipo = async (lug) => {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && tipo === prod.Tipo) addProduct(prod);
            });
        });
    };

    const filterByLugarYLado = async (lug) => {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1))) addProduct(prod);
            });
        });
    };

    
      
    if (lug && !tipo && !lado) {
      await filterByLugar(lug);
    } else if (tipo && !lado && !lug) {
        filterByTipo();
    } else if (lado && !tipo && !lug) {
        filterByLado();
    } else if (lug && tipo && !lado) {
        await filterByLugarYTipo(lug);
    } else if (lug && lado && !tipo) {
        await filterByLugarYLado(lug);
    } else if (tipo && lado && !lug) {
        filterByTipoYLado();
    } else if (tipo && lado && lug) {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1)) && tipo == prod.Tipo ) addProduct(prod);
            });
        });
    }

    return prods  
  };
  
  const [cart, setCart] = useState([])
  //Registrar Venta
  const [venta, setVenta] = useState({})
  const registrarVenta = async (data) => {
    const venta = {
      'cliente': data.cliente,
      'total': data.total
    }
    console.log(venta);
    try {
      const response = await fetch(`http://${URL}/api/ventas/registrarVenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(venta), credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }
  //obtener ventas
  const [ventas, setVentas] = useState([])
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
        setVentas(data.response);  // Asignar los datos a tu estado
        return data;
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas con la consulta:', error);
        return response
      }
  }
  //obtener venta
  const [idv, setIdv] = useState('')
  const [ventainf, setVentainf] = useState([])
  const [ventainfProds, setVentainfProds] = useState([])
  const getVenta = async (id) =>{
    try {
        const response = await fetch(`http://${URL}/api/ventas/getVentaId/${id}`, {
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
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        setIdv(data.venta[0].id_venta)
        setVentainf(data.venta[0])
        data.productos.map((v)=>{
            lugares.map((el)=>{
                if (el.id == v.id_lugar) {
                    v.lugName = el.fullname
                }
                
            })
        })
        setVentainfProds(data.productos)
        return data
      } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response
    }
      
  }
  //añadir producto a Venta
  const registrarProdsVenta = async (data) =>{
    console.log(data);
    
    try {
      const response = await fetch(`http://${URL}/api/ventas/registrarProdVenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.status);
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response
    }
  }
  //update de venta
  const updateVenta = async ( data, cart ) =>{

    let upVenta = {
      "venta" : {
        apellido: data.apellido,
        nombre: data.nombre,
        email: data.email,
        fecha: data.fecha,
        id_venta: data.id_venta,
        cel: data.cel,
        estado: data.estado,
        total: data.total
      },
      "cart" : cart
    }
 
    console.log(upVenta);
    console.log(cart);
    
    try {
      const formData = new FormData();
      formData.append('upVenta',upVenta); // 'archivo' debe ser el archivo que deseas enviar
      formData.append('cart', cart); // Puedes agregar otros datos como un JSON stringificado

      const response = await fetch(`http://${URL}/api/ventas/updateVenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(upVenta), 
        credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response 
    }
  }
  //eliminar venta
  const deleteVenta = async (id) =>{
    try {
      const response = await fetch(`http://${URL}/api/ventas/deleteVenta/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response 
    }
  }

  // Filtro productos
  // rows (filas de la tabla) 
  const [rowsVent, setRowsVent] = useState([])
  const filtrarEmail = async (email, estado, telefono) => {
    console.log(email, estado, telefono);

    estados.map((e)=>{
      if(e.estado == estado){
        estado = e.id
      }
    })
    
    setRowsVent([]);
    let vent = [];
    
    const addVenta = (venta) => {
      estados.map((est) =>{
          if (venta.estado == est.id) {
              let newCliente = {
                  id: venta.id,
                  col0: venta.id_venta, 
                  col1: venta.fecha, 
                  col2: venta.nombre,
                  col3: venta.apellido,
                  col4: venta.email,
                  col5: venta.cel,
                  col6: venta.total,
                  col7: est.estado
              }
              vent.push(newCliente)
            }
      })  
    };

    const filterByEmail = () => {
      console.log('filtrar email');
      ventas.forEach(venta => {
          if (email === venta.email) addVenta(venta);
      });
    };
    const filterByEstado = () => {
      console.log('filtrar estado');
      ventas.forEach(venta => {
          if ( estado === venta.estado) addVenta(venta);
      });
    };
    const filterByTelefono = () => {
      console.log('filtrar email');
      ventas.forEach(venta => {
          if (telefono === venta.cel) addVenta(venta);
      });
    };
    const filterByEstadoyEmail = () => {
      console.log('filtrar estado y email');
      ventas.forEach(venta => {
          if ( estado === venta.estado && email === venta.email) addVenta(venta);
      });
    };
    const filterByEstadoyTelefono = () => {
      console.log('filtrar estado y cel');
      ventas.forEach(venta => {
          if ( estado === venta.estado && telefono === venta.cel) addVenta(venta);
      });
    };
    const filterByEmailyTelefono = () => {
      console.log('filtrar estado y cel');
      ventas.forEach(venta => {
          if ( email === venta.email && telefono === venta.cel) addVenta(venta);
      });
    };



    if (email && !estado && !telefono) {
      filterByEmail()
    }else if (estado && !email && !telefono ) {
      filterByEstado()
    }else if (estado && email && !telefono ) {
      filterByEstadoyEmail()
    }else if (telefono && !estado && !email){
      filterByTelefono()
    }else if (telefono && estado && !email){
      filterByEstadoyTelefono()
    }else if (telefono && email && !estado){
      filterByEmailyTelefono()
    }



    return vent
  };
  

  // Limpiar Filtro
  const [lug, setLug] = useState('')
  const [lado, setLado] = useState('')
  const [tipo, setTipo] = useState('')
  const [descr, setDescr] = useState('')
  const [ubi, setUbi] = useState(false)

  const refresh = () =>{
      setUbi(false)
      setIdg('')
      setProducto([])
      setInfoprod([])
      setTipo('')
      setLado('')
      setLug('')
      setDescr('')
      let prods = []
      productos.map((prod)=>{ 
          //console.log(prod.id);
          tipos.map((ti)=>{
            if (prod.Tipo == ti.id) {
              let newProd = {
                  id: prod.IdGenerate,
                  col0: prod.IdGenerate, 
                  col1: ti.Tipo, 
                  col2: ti.Descripcion,
                  col3: prod.Ancho,
                  col4: prod.Alto,
                  col5: prod.Derc,
                  col6: prod.Izq,
                  col7: prod.stock,
                  col8: prod.Precio_U
                }
                prods.push(newProd)
          }
      })
      setRows(prods)})
  }

  const [idsvent, setidsVent] = useState([])

  const [email, setEmail] = useState('')
  const [emails, setEmails] = useState([])
  const [estadoV, setEstadoV] = useState('')
  const [estadosV, setEstadosV] = useState([])
  const [telV, setTelV] = useState('')
  const [telefonosV, setTelefonosV] = useState([])

  const refreshVenta = async () =>{
    setVentainf([])
    setEmail('')
    setEstadoV('')
    setTelV('')
    let vents = []
    let ids = []
    let em = []
    let estadosV = []
    let telefonosV = []
    estados.map((est)=>{
      estadosV.push(est.estado)
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
                    col6: cliente.total,
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
    setEstadosV(estadosV)
    setTelefonosV(telefonosV)
  }

  //Alertas
  const alert = async (status) =>{
    if (status == 'success') {
      const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Proceso exitoso"
        });
    }else if (status == 'error') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Problemas con el proceso"
      });
    }else if (status == 'warning') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "producto no se encuentra en ningun lugar"
      });
    }else if (status == 'succesStock') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Stock Actualizado"
      });
    }else if (status == 'errorCreate') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "El Producto ya existe"
      });
    }

  }

  //SwichProdVenta
  const [switchVentasProd, setSwitchVentasProd]  = useState(true)
      

  return (
      // aca llamamos al hoock useMiContexto
      <MiContexto.Provider value={{
        getLocal, view, setview,

        getEstados, estados, setEstados,

        createTipo,
        getTipos, tipos,

        vprod, setVprod, vent, setVent,
        
        createProducto, actualizarProducto, deleteProducto, addimgProduct, deleteProductoImg,
        productos, setProductos, getProductos,
        producto, setProducto, getProducto, idg, setIdg,
        getProductoIms, imgs, setImgs,
        productoUbi, setProductoUbi, getUbiProducto, infoprod, setInfoprod,
        updateStockProduct, 
        getProductosLugar, productsLug, setProductsLug, deleteProductoLugar,

        filtrarTipoLadoLug, rows, setRows,
        
        createLugar,
        getLugares, lugares, setLugares,
        lug, setLug, lado, setLado, tipo, setTipo, ubi, setUbi, descr, setDescr,
        insertProdLug, updateproductolugar,

        registrarVenta, registrarProdsVenta, venta, setVenta, 
        updateVenta,
        
        cart, setCart, 
        idv, setIdv,
        rowsVent, setRowsVent,
        emails, setEmails, email, setEmail, estadoV, setEstadoV, estadosV, setEstadosV, telV, setTelV, telefonosV, setTelefonosV,
        filtrarEmail,
        idsvent, setidsVent,
        
        getVentas, ventas, setVentas,
        getVenta ,ventainf, setVentainf, ventainfProds, setVentainfProds, deleteVenta,
        refresh, refreshVenta,
        alert,

        switchVentasProd, setSwitchVentasProd
      }} >
          {children}
      </MiContexto.Provider>
  )
}

// Este va a ser el encargado de proveer el contexto a elementos hijos
export default CartProvider