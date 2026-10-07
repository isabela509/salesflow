function StatWidget({
    titulo,
    valor,
    descripcion,
    icono,
    color
}) {

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-gray-500">
                        {titulo}
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
                        {valor}
                    </h2>

                    <p className="text-xs text-gray-500 mt-2">
                        {descripcion}
                    </p>

                </div>

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    {icono}
                </div>

            </div>

        </div>
    );
}

export default StatWidget;