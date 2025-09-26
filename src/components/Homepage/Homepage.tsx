import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { CheckSquare, LayoutList, Rocket } from "lucide-react";

const Homepage = () => {
    return (
        <div className="bg-slate-50 min-h-screen text-slate-800">
            <Navbar />

            <main className="font-roboto">
                {/* Seção Hero */}
                <section className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                        Organize seu dia, conquiste seus objetivos.
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        A maneira mais simples de gerenciar suas tarefas. Foco
                        no que realmente importa.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <a
                            href="/criar-conta"
                            className="inline-block text-primary bg-slate-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-slate-700 transition-colors duration-300"
                        >
                            Comece Agora!
                        </a>
                        <a
                            href="/login"
                            className="inline-block bg-white text-slate-700 font-semibold py-3 px-6 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors duration-300"
                        >
                            Já tenho uma conta
                        </a>
                    </div>
                </section>

                {/* Seção de Features */}
                <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-slate-900">
                                Tudo que você precisa para ser mais produtivo
                            </h2>
                            <p className="mt-4 text-lg text-slate-600">
                                Funcionalidades pensadas para simplificar sua
                                vida.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Feature Card */}
                            <div className="text-center p-8 border-2 border-slate-200 rounded-lg bg-white">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-800 text-primary mx-auto">
                                    <LayoutList size={24} color="#f0f0f0" />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                                    Listas Simples
                                </h3>
                                <p className="mt-2 text-base text-slate-500">
                                    Crie e organize suas tarefas de forma rápida
                                    e intuitiva.
                                </p>
                            </div>

                            {/* Feature Card */}
                            <div className="text-center p-8 border-2 border-slate-200 rounded-lg bg-white">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-800 text-primary mx-auto">
                                    <CheckSquare size={24} color="#f0f0f0" />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                                    Acompanhe seu Progresso
                                </h3>
                                <p className="mt-2 text-base text-slate-500">
                                    Marque tarefas como concluídas e sinta a
                                    satisfação do dever cumprido.
                                </p>
                            </div>

                            {/* Feature Card */}
                            <div className="text-center p-8 border-2 border-slate-200 rounded-lg bg-white">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-800 text-primary mx-auto">
                                    <Rocket size={24} color="#f0f0f0" />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                                    Rápido e Leve
                                </h3>
                                <p className="mt-2 text-base text-slate-500">
                                    Uma interface sem distrações para que você
                                    possa se concentrar no que importa.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seção Call to Action Final */}
                <section className="bg-slate-800">
                    <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
                            <span className="block text-primary">
                                Pronto para organizar sua vida?
                            </span>
                        </h2>
                        <p className="mt-4 text-2xl leading-6 text-slate-300 text-primary">
                            Crie sua conta gratuita hoje mesmo e dê o primeiro
                            passo para uma rotina mais produtiva.
                        </p>
                        <a
                            href="/criar-conta"
                            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-slate-800 bg-white hover:bg-slate-200 sm:w-auto"
                        >
                            Criar minha conta
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Homepage;
