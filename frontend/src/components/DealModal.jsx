import { useState } from "react";
import { X } from "lucide-react";

function DealModal({ cerrar, guardar }) {

    const [formulario, setFormulario] = useState({
        client_name: "",
        company: "",
        email: "",
        value: "",
        stage: "Nuevo"
    });

    const [error, setError] = useState("");

    const cambiarCampo = (e) => {

        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (
            !formulario.client_name ||
            !formulario.value ||
            !formulario.stage
        ) {
            setError(
                "Cliente, valor y etapa son obligatorios"
            );

            return;
        }

        const resultado = await guardar({
            ...formulario,
            value: Number(formulario.value)
        });

        if (!resultado.exito) {
            setError(resultado.mensaje);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

                {/* Encabezado */}

                <div className="flex items-center justify-between p-6 border-b">

                    <div>

                        <h2 className="text-xl font-bold text-gray-800">
                            Nueva oportunidad
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Registra una nueva venta potencial
                        </p>

                    </div>

                    <button
                        onClick={cerrar}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Formulario */}

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4"
                >

                    {/* Cliente */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Cliente *
                        </label>

                        <input
                            type="text"
                            name="client_name"
                            value={formulario.client_name}
                            onChange={cambiarCampo}
                            placeholder="Nombre del cliente"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                        />

                    </div>

                    {/* Empresa */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Empresa
                        </label>

                        <input
                            type="text"
                            name="company"
                            value={formulario.company}
                            onChange={cambiarCampo}
                            placeholder="Nombre de la empresa"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                        />

                    </div>

                    {/* Email */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Correo
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formulario.email}
                            onChange={cambiarCampo}
                            placeholder="cliente@empresa.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                        />

                    </div>

                    {/* Valor */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Valor de la oportunidad *
                        </label>

                        <input
                            type="number"
                            name="value"
                            min="0"
                            step="0.01"
                            value={formulario.value}
                            onChange={cambiarCampo}
                            placeholder="2500"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                        />

                    </div>

                    {/* Etapa */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Etapa *
                        </label>

                        <select
                            name="stage"
                            value={formulario.stage}
                            onChange={cambiarCampo}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                        >

                            <option value="Nuevo">
                                Nuevo
                            </option>

                            <option value="Contactado">
                                Contactado
                            </option>

                            <option value="Propuesta">
                                Propuesta
                            </option>

                            <option value="Ganado">
                                Ganado
                            </option>

                            <option value="Perdido">
                                Perdido
                            </option>

                        </select>

                    </div>

                    {/* Error */}

                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {/* Botones */}

                    <div className="flex gap-3 pt-2">

                        <button
                            type="button"
                            onClick={cerrar}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl"
                        >
                            Crear oportunidad
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default DealModal;