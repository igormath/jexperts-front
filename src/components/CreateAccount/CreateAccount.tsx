import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useRef, useState } from "react";
import postUser from "../../services/user/postUser";

const CreateAccount = () => {
    const nameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false);
    const [isPasswordShort, setIsPasswordShort] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            nameInput.current?.value &&
            emailInput.current?.value &&
            passwordInput.current?.value
        ) {
            if (passwordInput.current.value.length < 6) {
                return;
            }
            const response = await postUser(
                nameInput.current.value,
                emailInput.current.value,
                passwordInput.current.value,
            );
            if (!response.ok) {
                alert(
                    `Houve um erro ao criar a conta, tente novamente. ${response.data.error}`,
                );
            } else {
                setIsAccountCreated(true);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "user-password") {
            setIsPasswordShort(e.target.value.length < 6);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <main className="font-roboto flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                            Crie sua conta
                        </h2>
                        <p className="mt-2 text-center text-sm text-slate-600">
                            É rápido e fácil. Comece a organizar suas tarefas
                            hoje mesmo.
                        </p>
                    </div>
                    <div className="bg-white p-8 border-2 border-slate-200 rounded-lg shadow-md">
                        <form
                            id="user-create"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="user-name"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Nome
                                </label>
                                <input
                                    ref={nameInput}
                                    type="text"
                                    id="user-name"
                                    name="user-name"
                                    className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                    placeholder="Seu nome"
                                    required
                                />
                            </div>
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
                                    id="user-email"
                                    className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                    name="user-email"
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
                                    onChange={handleInputChange}
                                    type="password"
                                    id="user-password"
                                    className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                    name="user-password"
                                    placeholder="Sua senha"
                                    required
                                />
                                {isPasswordShort && (
                                    <p className="mt-2 text-xs text-red-600">
                                        A senha deve possuir mais que 6
                                        caracteres
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center text-primary bg-slate-800 font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-slate-700 transition-colors duration-300"
                            >
                                Criar conta
                            </button>
                            {isAccountCreated && (
                                <p className="text-center text-sm text-green-600 mt-4">
                                    Conta criada com sucesso! Você será
                                    redirecionado...
                                </p>
                            )}
                        </form>
                        <div className="text-sm text-center mt-6">
                            <Link
                                to="/"
                                className="font-medium text-slate-700 hover:text-slate-900"
                            >
                                Voltar para a página inicial
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateAccount;
