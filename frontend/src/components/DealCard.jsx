import {
    Building2,
    Mail,
    DollarSign
} from "lucide-react";

function DealCard({ deal }) {

    const coloresEtapa = {
        Nuevo: "bg-blue-100 text-blue-700",
        Contactado: "bg-yellow-100 text-yellow-700",
        Propuesta: "bg-purple-100 text-purple-700",
        Ganado: "bg-green-100 text-green-700",
        Perdido: "bg-red-100 text-red-700"
    };

    return (

        <div className="border border-slate-200 rounded-xl p-4 hover:border-pink-200 hover:shadow-sm transition">

            <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                {/* CLIENTE */}

                <div className="flex-1 min-w-0">

                    <h3 className="font-bold text-slate-800">
                        {deal.client_name}
                    </h3>

                    {deal.company && (

                        <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">

                            <Building2 size={14} />

                            <span>
                                {deal.company}
                            </span>

                        </div>

                    )}

                </div>

                {/* EMAIL */}

                <div className="flex-1 min-w-0">

                    {deal.email && (

                        <div className="flex items-center gap-2 text-sm text-slate-500">

                            <Mail size={16} />

                            <span className="truncate">
                                {deal.email}
                            </span>

                        </div>

                    )}

                </div>

                {/* VALOR */}

                <div className="flex items-center gap-1.5 font-bold text-slate-800 lg:w-32">

                    <DollarSign
                        size={17}
                        className="text-emerald-500"
                    />

                    {Number(deal.value).toLocaleString(
                        "en-US",
                        {
                            minimumFractionDigits: 2
                        }
                    )}

                </div>

                {/* ETAPA */}

                <div className="lg:w-28">

                    <span
                        className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
                            coloresEtapa[deal.stage]
                        }`}
                    >
                        {deal.stage}
                    </span>

                </div>

            </div>

        </div>
    );
}

export default DealCard;