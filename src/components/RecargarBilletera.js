import { useContext, useState } from 'react';
import  {Url} from '../utils/url'
import  {Message} from '../container/message'
import { UseContext } from '../context/UseContext';


export default function RecargarBilletera ( ) {

    const [mensaje, setMensaje] = useState(null)
   const {token} = useContext(UseContext)
    const sendRecarga = (e) => {

e.preventDefault()
            
           const valor = e.target.recarga.value
        e.target.recarga.value = ""
        
        fetch(Url+'update', {
            method:"PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'bearer ' + token
              },
            body: JSON.stringify({valor})
            
        }).then(res => res.json()).then(r => {
           if(r.text === "success"){
             setMensaje(<Message text={'Recarga exitosa'} theme="success"/>)
           }else{
          setMensaje(<Message text={'Ocurrió un error'+ r} theme="error"/>)

           }

        }).catch(e => {
            
            setMensaje(<Message text={'Ocurrió un error ' + e} theme="error"/>)

        })
          
    }

    return(
        
        <div>
            <form onSubmit={sendRecarga}>
                <h1>Recargar Billetera</h1>
               
                <input type="number" name="recarga" required />
            <button type="submit">RecargarBilletera</button>
            {mensaje  ?  mensaje : ''}
            </form>
               
        </div>
    )
}