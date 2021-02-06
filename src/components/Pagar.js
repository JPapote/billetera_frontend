import {useState} from 'react'
import {Url} from './url'

const Pagar = ({email, celular, documento}) => {

    const [mensaje, setMensaje] = useState('');
    const [valid, setValid] = useState(false);

    const confirmacion = (e) => {
        e.preventDefault()
        fetch(Url+'update', {
            method:"PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({cuenta: e.target.dinero.value, token: e.target.token.value, id: e.target.id.value, documento, celular})
            
        }).then(res => res.json()).then( r=> {
            setMensaje(r.text)

        }).
               
        catch(e => {
            
            console.log(e)
        })
    }

    const envioToken = () => {
        fetch(Url+'enviotoken', {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email:email})
            
        }).then(async res => res.json())
        .then(res => {
            setMensaje(res.text)
        })
              
    .catch(e => {
            
            console.log(e)
        })
        setValid(true)
       
        
    }
    return (
        <div>
            
        {valid ? 
      <form onSubmit={confirmacion}>
          <h1>Pagar Cuenta</h1>
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
      
      {mensaje.length != 0 ? <p>{mensaje}</p> : ''}
              
      </form> : <button onClick={envioToken}>Pagar Cuenta</button>
    
    }
        
        </div>

    )
}

export default Pagar