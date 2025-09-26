import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useRef } from "react";
import loginUser from "../../services/login/loginUser";

const Login = () => {
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (emailInput.current?.value && passwordInput.current?.value) {
            const response = await loginUser(
                emailInput.current.value,
                passwordInput.current.value,
            );
            if (!response.ok) {
                alert(
                    `Houve um erro ao tentar realizar o login, tente novamente! ${response.data.error}`,
                );
            } else {
                // Adicionar o valor da chave JWT ao localStorage.
                localStorage.setItem(
                    "jwt-key",
                    JSON.stringify(response.data.token),
                );
                navigate("/home", {
                    state: { email: emailInput.current.value },
                });
            }
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <main className="font-roboto flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                            Acesse sua conta
                        </h2>
                        <p className="mt-2 text-center text-lg text-slate-600">
                            Organize suas tarefas e alcance seus objetivos.
                        </p>
                    </div>
                    <div className="bg-white p-8 border-2 border-slate-200 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="user-email"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Email
                                </label>
                                <input
                                    ref={emailInput}
                                    type="email"
                                    name="user-email"
                                    id="user-email"
                                    className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                    placeholder="Seu email"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="user-password"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Senha
                                </label>
                                <input
                                    ref={passwordInput}
                                    type="password"
                                    name="user-password"
                                    id="user-password"
                                    className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                    placeholder="Sua senha"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center text-primary bg-slate-800 font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-slate-700 transition-colors duration-300"
                            >
                                Entrar
                            </button>
                        </form>
                        <div className="text-sm text-center mt-6">
                            <p className="text-slate-600">
                                Não possui conta?{" "}
                                <Link
                                    to="/criar-conta"
                                    className="font-medium text-slate-700 hover:text-slate-900"
                                >
                                    Criar uma conta
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
