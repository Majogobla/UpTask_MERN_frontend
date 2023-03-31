import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

export default function OlvidePassword() 
{
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e =>
    {
        e.preventDefault();

        if(email === '' || email.length < 6)
        {
            setAlerta(
                {
                    msg: 'El correo es Obligatorio',
                    error: true
                }
            );

            return;
        }

        try 
        {
            // TODO: Mover hacia un cliente Axios
            const { data } = await clienteAxios.post(`/usuarios/olvide-password`, 
            { email });

            setAlerta(
                {
                    msg: data.msg,
                    error: false
                }
            )
        } 
        catch (error) 
        {
            setAlerta(
                { 
                    msg: error.response.data.msg,
                    error: true
                }
            );
        }
    }

    const { msg } = alerta;

    return (
        <>
            <h1
                className="text-sky-600 font-black text-6xl capitalize"
            >
                Recupera tu acceso y no pierdas tus {' '}
                <span className="text-slate-700">Proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta}/>}

            <form
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                <div
                    className="my-5"
                >
                    <label 
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Correo
                    </label>
                    
                    <input 
                        type="email" 
                        placeholder="Correo de registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Enviar Instrucciones" 
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
                />
            </form>

            <nav
                className="lg:flex lg:justify-between"
            >
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/"
                >
                    ¿Ya tines una Cuneta? <span className="font-bold ml-2">Inicia sesión</span>
                </Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/registrar"
                >
                    ¿No tienes un Cuneta? <span className="font-bold ml-2">Regístrate</span>
                </Link>
            </nav>
        </>
    )
}