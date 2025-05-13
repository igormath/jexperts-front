import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header"
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
    const [showModal, setShowModal] = useState<boolean>(false)
    const [isPasswordShort, setIsPasswordShort] = useState<boolean>(false);

    const handleSubmitUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getAuthToken();
        if (!token) {
            console.error("Nenhuma chave encontrada no local storage.");
            return;
        }
        console.log("Início do update");
        if (nameInput.current?.value && passwordInput.current?.value){
            if (passwordInput.current.value.length < 6){
                return;
            }
            const response = await putUser(email, nameInput.current.value, passwordInput.current.value, token);
            if (!response.ok){
                alert(`Houve um erro ao tentar atualizar o perfil, tente novamente! ${response.data.error}`);
            } else{
                setIsUpdateSuccess(true);
                setTimeout(() => {
                    setIsUpdateSuccess(false);
                }, 5000)
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "user-password"){
            setIsPasswordShort(e.target.value.length < 6);
        }
    }

    const handleBackHome = () => {
        navigate("/home", { state: { email: email } });
    }
    
    return (
    <>
            <Header/>
            <main className="font-roboto">
                <p className="w-10/12 mx-auto mt-12 text-lg text-start lg:text-center">Atualize suas informações: </p>
                <div className="flex flex-col w-10/12 mt-5 mx-auto lg:w-1/2 lg:mx-auto lg:border-2 lg:border-slate-500 lg:rounded-md lg:p-5 2xl:w-1/3">
                <form onSubmit={handleSubmitUpdate}>
                    <label htmlFor="user-email" className="flex flex-col">
                        <span>Novo nome:</span>
                        <input ref={nameInput} type="text" name="user-name" id="user-name" className="h-11 border-2 rounded text-gray-100 mb-4 px-3" defaultValue={name} placeholder="Digite seu novo nome" required/>
                    </label>
                    <label htmlFor="user-password" className="flex flex-col">
                        <span>Nova senha:</span>
                        <input ref={passwordInput} onChange={handleInputChange} type="password" name="user-password" id="user-password" className="h-11 border-2 rounded mb-4 px-3" placeholder="Digite sua nova senha" required/>
                    </label>
                    {isPasswordShort && <p className="text-left text-alert mb-4 pl-2">A senha deve possuir mais que 6 caracteres</p>}
                    <button type="submit" className="h-11 w-7/12 mx-auto block rounded bg-slate-800 my-2 hover:bg-slate-700 text-primary text-center">Atualizar</button>
                </form>
                <button onClick={() => setShowModal(true)} className="h-11 w-7/12 mx-auto mt-4 block rounded bg-red-500 my-2 hover:bg-red-400 text-primary text-center">Remover perfil</button>
                <ModalRemove 
                    isVisible={showModal} 
                    onClose={() => setShowModal(false)}
                    email={email}
                />
                {isUpdateSuccess && <p className="mt-5 text-center">Informações atualizadas com sucesso!</p>}
                <a className="my-4 text-link-primary hover:text-link-secondary text-center cursor-pointer" onClick={handleBackHome}>Voltar para a página de tarefas</a>
                </div>
            </main>
        </>
    )
}

export default EditUser
