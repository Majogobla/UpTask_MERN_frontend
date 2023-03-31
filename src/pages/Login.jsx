import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

export default function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e =>
    {
        e.preventDefault();

        if([email, password].includes(''))
        {
            setAlerta(
                {
                    msg: "Todos los campos son obligatorios",
                    error: true
                }
            );

            setTimeout(() => 
            {
                setAlerta({});    
            }, 
            3000);

            return;
        }

        try 
        {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password });

            setAlerta({});

            localStorage.setItem('token', data.token);

            setAuth(data);

            navigate('/proyectos');
        } 
        catch (error) 
        {
            setAlerta(
                {
                    msg: error.response.data.msg,
                    error: true
                }
            );

            setTimeout(() => 
            {
                setAlerta({});    
            }, 
            3000);
        }
    }

    const { msg } = alerta;
    

    return (
        <>
            <h1
                className="text-sky-600 font-black text-6xl capitalize"
            >
                Inicia sesión y administra tus {' '}
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

                <div
                    className="my-5"
                >
                    <label 
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Contraseña
                    </label>
                    
                    <input 
                        type="password" 
                        placeholder="Contraseña de registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="iniciar Sesión" 
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
                />
            </form>

            <nav
                className="lg:flex lg:justify-between"
            >
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/registrar"
                >
                    ¿No tienes un Cuneta? <span className="font-bold ml-2">Regístrate</span>
                </Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/olvide-password"
                >
                    Olvidé mi contraseña
                </Link>
            </nav>
        </>
    )
}