import { ListChecks } from "lucide-react";

const Navbar = () => {
    return (
        <header className="font-roboto bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold text-slate-800"
                    >
                        <ListChecks className="h-6 w-6 text-slate-700" />
                        <span>Meu To-Do</span>
                    </a>

                    <div className="flex items-center gap-4">
                        <a
                            href="/login"
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Entrar
                        </a>
                        <a
                            href="/criar-conta"
                            className="bg-slate-800 text-primary text-sm font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            Criar Conta
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
