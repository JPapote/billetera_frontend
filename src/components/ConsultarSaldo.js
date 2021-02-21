import { useState, useContext } from 'react';
import { Url } from '../utils/url'
import { UseContext } from '../context/UseContext';

export default function ConsultarSaldo() {

    const [mensaje, setMensaje] = useState('');
    const { token } = useContext(UseContext)

    const getSaldo = () => {


        fetch(Url + 'consultarSaldo', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'bearer ' + token
            }

        }).then(async res => await res.json()).then(r => {
            setMensaje(r.text)

        }).catch(e => {
            console.log(token)

            console.log(e)
        })
    }

    return (
        <div style={{ margin: '10px' }}>
            <button onClick={getSaldo}>
                Consultar saldo
           </button>
            { mensaje ?
                <p>${mensaje}</p> : ''
            }
        </div>
    )
} 