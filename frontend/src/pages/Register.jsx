import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMensaje("");
        setError("");

        if (!name || !email || !password) {
            setError("Completa todos los campos");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {

            const respuesta = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setError(datos.mensaje);
                return;
            }

            setMensaje("¡Cuenta creada correctamente!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(error);

            setError(
                "No se pudo conectar con el servidor"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

                {/* Encabezado */}

                <div className="text-center mb-8">

                    <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">

                        <UserPlus
                            className="text-pink-500"
                            size={32}
                        />

                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Crear cuenta
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Únete a SalesFlow
                    </p>

                </div>

                {/* Formulario */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Nombre */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nombre completo
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Isabela Jimenez"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                        />

                    </div>

                    {/* Correo */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="correo@ejemplo.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                        />

                    </div>

                    {/* Contraseña */}

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
                                placeholder="Mínimo 6 caracteres"
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
                                {mostrarPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>

                        </div>

                    </div>

                    {/* Mensajes */}

                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {mensaje && (
                        <div className="bg-green-100 text-green-700 p-3 rounded-xl text-sm">
                            {mensaje}
                        </div>
                    )}

                    {/* Botón */}

                    <button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition"
                    >
                        Crear cuenta
                    </button>

                </form>

                {/* Login */}

                <p className="text-center text-gray-500 mt-6">

                    ¿Ya tienes una cuenta?{" "}

                    <Link
                        to="/login"
                        className="text-pink-500 font-semibold hover:underline"
                    >
                        Inicia sesión
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;