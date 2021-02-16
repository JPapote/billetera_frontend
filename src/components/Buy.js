import {useState} from 'react'
import {Url} from '../utils/url'
import  {Message} from '../container/message'

const Buy = ({token}) => {

    const [mensaje, setMensaje] = useState(null)
    const [valid, setValid] = useState(false);

    const confirmacion = (e) => {
        e.preventDefault()

        const obj = {
            cuenta: e.target.dinero.value,  
            tokenDePago: e.target.token.value, 
            id: e.target.id.value
        }
        e.target.dinero.value = ""
        e.target.token.value = ""
        e.target.id.value = ""
         
        fetch(Url+'update', {
            method:"PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'bearer ' + token
              },
            body: JSON.stringify(obj)
            
        }).then(res => res.json()).then( r=> {
            if(r.text === "success"){
               setMensaje(<Message text={'Cuenta paga!!'} theme="success"/>)
             }else{
              setMensaje(<Message text={'Ocurrió un error'} theme="error"/>)
  
             }
        }).catch(e => {
            
          setMensaje(<Message text={'Ocurrió un error: ' + e} theme="error"/>)
        })
    }

    const envioToken = () => {
        fetch(Url+'enviotoken', {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'bearer ' + token
              },
            body: JSON.stringify({token})
            
        }).then(res => res.json())
        .then(res => {
            if(res.status === 200){
                setValid(true)

             }else{
             setMensaje(<Message text={'Ocurrió un error'} theme="error"/>)
  
             }
        })
              
    .catch(e => {
            
        setMensaje(<Message text={'Ocurrió un error: ' + e} theme="error"/>)


        })
        
       
        
    }
    return (
        <div>
            
        {valid ? 
      <form onSubmit={confirmacion}>
          <h1>Pagar Cuenta</h1>
          
      {!mensaje ? <p>Se a enviado un token y un id a tu correo, por favor ingresalo</p> : ''} 

      <label>
          ID usuario
      </label>
      <input type="text" placeholder="Ingresa tu id de usuario"  name="id" required />
      
      <label>
          Token
      </label>
      <input type="text" placeholder="Ingresa tu token" name="token" required />
      
      <label>Ingrese la cantidad</label>
      <input type="number" placeholder="Ingresa el monto" min="1" name="dinero" required />

      <button type="submit">Enviar</button>
      

      {mensaje ? mensaje : ''}
              
      </form> : <button onClick={envioToken}>Buy</button>
    
    }
        
        </div>

    )
}

export default Buy