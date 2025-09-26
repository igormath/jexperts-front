import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useRef, useState } from "react";
import putUser from "../../services/user/putUser";
import getAuthToken from "../../util/authToken";
import ModalRemove from "../Modal/ModalRemove";

const EditUser = () => {
    const nameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const location = useLocation();
    const email = location.state?.email;
    const name = location.state?.name;
    const navigate = useNavigate();
    const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isPasswordShort, setIsPasswordShort] = useState<boolean>(false);

    const handleSubmitUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getAuthToken();
        if (!token) {
            console.error("Nenhuma chave encontrada no local storage.");
            return;
        }
        console.log("Início do update");
        if (nameInput.current?.value && passwordInput.current?.value) {
            if (passwordInput.current.value.length < 6) {
                return;
            }
            const response = await putUser(
                email,
                nameInput.current.value,
                passwordInput.current.value,
                token,
            );
            if (!response.ok) {
                alert(
                    `Houve um erro ao tentar atualizar o perfil, tente novamente! ${response.data.error}`,
                );
            } else {
                setIsUpdateSuccess(true);
                setTimeout(() => {
                    setIsUpdateSuccess(false);
                }, 5000);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "user-password") {
            setIsPasswordShort(e.target.value.length < 6);
        }
    };

    const handleBackHome = () => {
        navigate("/home", { state: { email: email } });
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <main className="font-roboto flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                            Atualize suas informações
                        </h2>
                        <p className="mt-2 text-center text-sm text-slate-600">
                            Mantenha seus dados sempre em dia.
                        </p>
                    </div>
                    <div className="bg-white p-8 border-2 border-slate-200 rounded-lg shadow-md space-y-6">
                        <form
                            onSubmit={handleSubmitUpdate}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="user-name"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Novo nome
                                </label>
                                <input
                                    ref={nameInput}
                                    type="text"
                                    name="user-name"
                                    id="user-name"
                                    className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                    defaultValue={name}
                                    placeholder="Digite seu novo nome"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="user-password"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Nova senha
                                </label>
                                <input
                                    ref={passwordInput}
                                    onChange={handleInputChange}
                                    type="password"
                                    name="user-password"
                                    id="user-password"
                                    className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                    placeholder="Digite sua nova senha"
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
                                Atualizar
                            </button>
                            {isUpdateSuccess && (
                                <p className="text-center text-sm text-green-600">
                                    Informações atualizadas com sucesso!
                                </p>
                            )}
                        </form>
                        <div className="border-t border-slate-200"></div>
                        <div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="w-full flex justify-center text-primary bg-red-600 font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-red-500 transition-colors duration-300"
                            >
                                Remover perfil
                            </button>
                        </div>
                        <ModalRemove
                            isVisible={showModal}
                            onClose={() => setShowModal(false)}
                            email={email}
                        />
                        <div className="text-sm text-center">
                            <a
                                className="font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
                                onClick={handleBackHome}
                            >
                                Voltar para a página de tarefas
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditUser;
