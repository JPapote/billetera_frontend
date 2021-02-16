import { useState } from 'react';
import ConsultarSaldo from './ConsultarSaldo';
import RecargarBilletera from './RecargarBilletera'
import Buy from './Buy'
import {Url} from '../utils/url'
import  {Message} from '../container/message'

import './Registro.css'

export default function Registro() {

    const [mensaje, setMensaje] = useState(null);
    const [valid, setValid] = useState(false);
    const [token, setToken] = useState('')


    const sendData = async (e) => {
    
        e.preventDefault()        
        
        if (e.target.celular.value.length <= 5 || e.target.celular.value.length > 15 ) {
            setMensaje('El numero de celular debe tener al mas de 6 cifras o menos de 15')
        setValid(false)

        }
        else if(e.target.documento.value.length <= 6 || e.target.documento.value.length > 9){
            setMensaje('El numero de documento debe tener entre 7 y 9caracteres ')
        setValid(false)

        }
        else{
            
            const obj = {
             nombre: e.target.nombre.value,
             email:e.target.email.value,
             documento: e.target.documento.value,
             celular: e.target.celular.value
            }
          
             fetch(Url+'registro', {
                method:"POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(obj)
                
            }).then(async res => await res.json()).then(r => {
                
                 setToken(r.token)
                        setValid(true)
            })
            .catch(e => {
                setValid(false)
                setMensaje(<Message text={'Ocurrió un error ' + e} theme="error"/>)

            })
            
        }

    }

    return (
        !valid  ?
        
        <div className=  "Container" >
        
            <form onSubmit={sendData}>
            <h1>Resgistro</h1>
                <label>Nombre</label>
                <input type="text" placeholder="Ingresa tu nombre" name="nombre" minLength="2" maxLength="20" required />

                <label>Email</label>
                <input type="email" placeholder="Ingresa Email" name="email" required />

                <label>Celular</label>
                <input type="number" placeholder="Ingresa tu numero de celular" name="celular" required />

                <label>Documento</label>
                <input type="number" placeholder="Ingresa tu numero de documento"  name="documento" required />

                <button type="submit" className="Button">Enviar</button>
            {mensaje ? 
                        mensaje

                     :  ''
            }
            </form>
            
                
            
                
                    
            </div>
                :
                 
                 

                 <div className="Container">
                   <RecargarBilletera token={token}/>
                   <ConsultarSaldo token={token}/>
                   <Buy token={token}/>
                </div>
                   
        
        


         
    )
}