import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, Eye, EyeOff } from "lucide-react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        if (!email || !password) {
            setMensaje("Completa todos los campos");
            return;
        }

        try {
            const respuesta = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setMensaje(datos.mensaje);
                return;
            }

            login(datos);
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            setMensaje("No se pudo conectar con el servidor");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

                <div className="text-center mb-8">

                    <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <LogIn className="text-pink-500" size={32} />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        SalesFlow
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Inicia sesión para gestionar tus ventas
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Contraseña
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    mostrarPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setMostrarPassword(
                                        !mostrarPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {mostrarPassword
                                    ? <EyeOff size={20} />
                                    : <Eye size={20} />
                                }
                            </button>

                        </div>

                    </div>

                    {mensaje && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm">
                            {mensaje}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition"
                    >
                        Iniciar sesión
                    </button>

                </form>

                <p className="text-center text-gray-500 mt-6">

                    ¿No tienes una cuenta?{" "}

                    <Link
                        to="/register"
                        className="text-pink-500 font-semibold hover:underline"
                    >
                        Regístrate
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;