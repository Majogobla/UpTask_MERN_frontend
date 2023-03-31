import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

export default function Registrar() 
{
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState([]);

    const handleSubmit = async e =>
    {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes(''))
        {
            setAlerta(
                {
                    msg: "Todos los campos son obligatorios",
                    error: true
                }
            )

            return;
        }

        if(password !== repetirPassword)
        {
            setAlerta(
                {
                    msg: "Las contraseñas no son iguales",
                    error: true
                }
            )

            return;
        }

        if(password.length < 6)
        {
            setAlerta(
                {
                    msg: "La contrasña es muy corta, mínimo 6 caracteres",
                    error: true
                }
            )

            return;
        }

        setAlerta({});

        // Crear el usuario en la API
        try 
        {
            const { data } = await clienteAxios.post(`/usuarios`,
            {
                nombre,
                password,
                email,
            });

            setAlerta(
                {
                    msg: data.msg,
                    error: false
                }
            )

            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');
        } 
        catch (error) 
        {
            setAlerta(
                {
                    msg: error.response.data.msg,
                    error: true,
                }
            )
        }
    }

    const { msg } = alerta;

    return (
        <>
            <h1
                className="text-sky-600 font-black text-6xl capitalize"
            >
                Crea tu cuenta y administra tus {' '}
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
                        htmlFor="nombre"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombre
                    </label>
                    
                    <input 
                        type="text" 
                        placeholder="Tu nombre"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

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

                <div
                    className="my-5"
                >
                    <label 
                        htmlFor="password2"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Contraseña
                    </label>
                    
                    <input 
                        type="password" 
                        placeholder="Repite tu contraseña"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        id="password2"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Registrarse" 
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
                    to="/olvide-password"
                >
                    Olvidé mi contraseña
                </Link>
            </nav>
        </>
    )
}