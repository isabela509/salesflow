import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}

                <div>
                    <h1 className="text-2xl font-bold text-pink-500">
                        SalesFlow
                    </h1>

                    <p className="text-xs text-gray-500">
                        Mini CRM de Ventas
                    </p>
                </div>

                {/* Usuario */}

                <div className="flex items-center gap-4">

                    <div className="hidden sm:flex items-center gap-2">

                        <div className="w-9 h-9 bg-pink-100 rounded-full flex items-center justify-center">
                            <User
                                size={18}
                                className="text-pink-500"
                            />
                        </div>

                        <span className="text-sm font-semibold text-gray-700">
                            {usuario?.name}
                        </span>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                        <LogOut size={18} />
                        <span className="hidden sm:inline">
                            Cerrar sesión
                        </span>
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;