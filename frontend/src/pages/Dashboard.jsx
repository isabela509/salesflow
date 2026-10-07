import { useEffect, useState } from "react";
import {
    DollarSign,
    Target,
    Trophy,
    Plus,
    Search,
    LayoutDashboard,
    LogOut
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import StatWidget from "../components/StatWidget";
import DealCard from "../components/DealCard";
import DealModal from "../components/DealModal";

function Dashboard() {

    const { token, usuario, logout } = useAuth();

    const [deals, setDeals] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [etapaFiltro, setEtapaFiltro] = useState("Todos");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const cargarDeals = async () => {

        try {

            setCargando(true);

            const respuesta = await fetch(
                "http://localhost:5000/api/deals",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (respuesta.status === 401) {
                logout();
                return;
            }

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setError(datos.mensaje);
                return;
            }

            setDeals(datos);

        } catch (error) {

            console.error(error);

            setError(
                "No se pudo conectar con el servidor"
            );

        } finally {

            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDeals();
    }, [token]);
    

    const exportarCSV = () => {

    if (dealsFiltrados.length === 0) {
        alert("No hay oportunidades para exportar");
        return;
    }

    const encabezados = [
        "Cliente",
        "Empresa",
        "Email",
        "Valor",
        "Etapa",
        "Fecha"
    ];

    const filas = dealsFiltrados.map((deal) => [
        deal.client_name,
        deal.company || "",
        deal.email || "",
        deal.value,
        deal.stage,
        deal.created_at
    ]);

    const contenido = [
        encabezados,
        ...filas
    ]
        .map((fila) =>
            fila
                .map((campo) =>
                    `"${String(campo).replace(/"/g, '""')}"`
                )
                .join(";")
        )
        .join("\n");

    const blob = new Blob(
    ["\uFEFF" + contenido],
    {
        type: "text/csv;charset=utf-8;"
    }
);

    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "salesflow-oportunidades.csv";

    document.body.appendChild(enlace);

    enlace.click();

    document.body.removeChild(enlace);

    URL.revokeObjectURL(url);
};

    const crearDeal = async (nuevoDeal) => {

        try {

            const respuesta = await fetch(
                "http://localhost:5000/api/deals",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(nuevoDeal)
                }
            );

            if (respuesta.status === 401) {

                logout();

                return {
                    exito: false,
                    mensaje: "Sesión expirada"
                };
            }

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                return {
                    exito: false,
                    mensaje: datos.mensaje
                };
            }

            setDeals((actuales) => [
                datos.deal,
                ...actuales
            ]);

            setMostrarModal(false);

            return {
                exito: true
            };

        } catch {

            return {
                exito: false,
                mensaje: "Error de conexión"
            };
        }
    };

    const totalPipeline = deals.reduce(
        (total, deal) =>
            total + Number(deal.value || 0),
        0
    );

    const oportunidadesActivas = deals.filter(
        (deal) =>
            deal.stage !== "Ganado" &&
            deal.stage !== "Perdido"
    ).length;

    const ventasGanadas = deals
        .filter(
            (deal) => deal.stage === "Ganado"
        )
        .reduce(
            (total, deal) =>
                total + Number(deal.value || 0),
            0
        );

    const dealsFiltrados = deals.filter((deal) => {

        const texto = busqueda.toLowerCase();

        const coincideBusqueda =
            deal.client_name
                ?.toLowerCase()
                .includes(texto) ||
            deal.company
                ?.toLowerCase()
                .includes(texto);

        const coincideEtapa =
            etapaFiltro === "Todos" ||
            deal.stage === etapaFiltro;

        return coincideBusqueda && coincideEtapa;
    });

    return (

        <div className="min-h-screen bg-slate-100 flex">

            {/* SIDEBAR */}

            <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col fixed left-0 top-0 bottom-0">

                {/* Logo */}

                <div className="h-20 px-6 flex items-center border-b border-slate-100">

                    <div>

                        <h1 className="text-2xl font-bold text-pink-500">
                            SalesFlow
                        </h1>

                        <p className="text-xs text-slate-400">
                            Mini CRM
                        </p>

                    </div>

                </div>

                {/* Menú */}

                <div className="p-4">

                    <div className="flex items-center gap-3 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl font-semibold">

                        <LayoutDashboard size={20} />

                        Dashboard

                    </div>

                </div>

                {/* Usuario */}

                <div className="mt-auto p-4 border-t border-slate-100">

                    <div className="flex items-center gap-3 mb-4">

                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">

                            <span className="font-bold text-pink-500">
                                {usuario?.name?.charAt(0)}
                            </span>

                        </div>

                        <div className="min-w-0">

                            <p className="font-semibold text-sm text-slate-700 truncate">
                                {usuario?.name}
                            </p>

                            <p className="text-xs text-slate-400 truncate">
                                {usuario?.email}
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={() => {
                            logout();
                            window.location.href = "/login";
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition"
                    >

                        <LogOut size={18} />

                        Cerrar sesión

                    </button>

                </div>

            </aside>

            {/* CONTENIDO */}

            <main className="w-full md:ml-64">

                {/* HEADER */}

                <header className="h-20 bg-white border-b border-slate-200 px-5 sm:px-8 flex items-center justify-between">

                    <div>

                        <p className="text-sm text-slate-400">
                            Bienvenida
                        </p>

                        <h2 className="text-lg font-bold text-slate-800">
                            {usuario?.name}
                        </h2>

                    </div>

                    <button
                        onClick={() => setMostrarModal(true)}
                        className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm transition"
                    >

                        <Plus size={19} />

                        <span className="hidden sm:inline">
                            Nueva oportunidad
                        </span>

                    </button>

                </header>

                {/* DASHBOARD */}

                <div className="p-5 sm:p-8 max-w-7xl mx-auto">

                    <div className="mb-8">

                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                            Resumen de ventas
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Aquí tienes una vista general de tus oportunidades.
                        </p>

                    </div>

                    {/* ESTADÍSTICAS */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

                        <StatWidget
                            titulo="Total Pipeline"
                            valor={`$${totalPipeline.toLocaleString(
                                "en-US",
                                {
                                    minimumFractionDigits: 2
                                }
                            )}`}
                            descripcion="Valor de oportunidades"
                            icono={
                                <DollarSign
                                    size={22}
                                    className="text-emerald-600"
                                />
                            }
                            color="bg-emerald-100"
                        />

                        <StatWidget
                            titulo="Activas"
                            valor={oportunidadesActivas}
                            descripcion="En proceso de venta"
                            icono={
                                <Target
                                    size={22}
                                    className="text-blue-600"
                                />
                            }
                            color="bg-blue-100"
                        />

                        <StatWidget
                            titulo="Ventas ganadas"
                            valor={`$${ventasGanadas.toLocaleString(
                                "en-US",
                                {
                                    minimumFractionDigits: 2
                                }
                            )}`}
                            descripcion="Ventas cerradas"
                            icono={
                                <Trophy
                                    size={22}
                                    className="text-amber-600"
                                />
                            }
                            color="bg-amber-100"
                        />

                    </div>

                    {/* OPORTUNIDADES */}

                    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm">

                        {/* CABECERA */}

                        <div className="p-5 sm:p-6 border-b border-slate-200">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                <div>

                                    <h2 className="text-lg font-bold text-slate-800">
                                        Oportunidades
                                    </h2>

                                    <p className="text-sm text-slate-400">
                                        {dealsFiltrados.length} registros
                                    </p>

                                </div>
                                  
                                <div className="flex flex-col sm:flex-row gap-3">
 <button
        onClick={exportarCSV}
        className="px-4 py-2.5 border border-slate-200 bg-white text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition"
    >
        Exportar CSV
    </button>
                                    <div className="relative">

                                        <Search
                                            size={17}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            value={busqueda}
                                            onChange={(e) =>
                                                setBusqueda(e.target.value)
                                            }
                                            placeholder="Buscar..."
                                            className="w-full sm:w-56 pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-pink-200"
                                        />

                                    </div>

                                    <select
                                        value={etapaFiltro}
                                        onChange={(e) =>
                                            setEtapaFiltro(e.target.value)
                                        }
                                        className="px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 outline-none"
                                    >

                                        <option value="Todos">
                                            Todas
                                        </option>

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

                            </div>

                        </div>

                        {/* LISTA */}

                        <div className="p-5 sm:p-6">

                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-5">
                                    {error}
                                </div>
                            )}

                            {cargando ? (

                                <div className="py-12 text-center text-slate-400">
                                    Cargando...
                                </div>

                            ) : dealsFiltrados.length === 0 ? (

                                <div className="py-12 text-center">

                                    <p className="text-slate-400">
                                        No hay oportunidades.
                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-3">

                                    {dealsFiltrados.map((deal) => (

                                        <DealCard
                                            key={deal.id}
                                            deal={deal}
                                        />

                                    ))}

                                </div>

                            )}

                        </div>

                    </section>

                </div>

            </main>

            {mostrarModal && (
                <DealModal
                    cerrar={() =>
                        setMostrarModal(false)
                    }
                    guardar={crearDeal}
                />
            )}

        </div>
    );
}

export default Dashboard;