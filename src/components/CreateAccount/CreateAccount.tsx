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
        if (nameInput.current?.value && emailInput.current?.value && passwordInput.current?.value){
            if (passwordInput.current.value.length < 6){
                return;
            }
            const response = await postUser(nameInput.current.value, emailInput.current.value, passwordInput.current.value);
            if (!response.ok){
                alert(`Houve um erro ao criar a conta, tente novamente. ${response.data.error}`);
            } else {
                setIsAccountCreated(true);
                setTimeout(() => {
                    navigate("/")
                }, 3000);
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "user-password"){
            setIsPasswordShort(e.target.value.length < 6);
        }
    }

    return (
    <>
        <Header/>
        <main className="font-roboto">
        <h2 className="text-center text-2xl font-light pt-10 ">Crie agora sua conta:</h2>
            <form id="user-create" onSubmit={handleSubmit} className="flex flex-col w-10/12 mt-16 mx-auto lg:w-1/2 lg:mx-auto lg:border-2 lg:border-slate-500 lg:rounded-md lg:p-5 2xl:w-1/3">
                <label htmlFor="user-name" className="add__label">Digite seu nome:</label>
                <input ref={nameInput} type="text" id="user-name" name="user-name" className="h-11 border-2 rounded text-gray-100 mb-4 px-3" placeholder="Seu nome" required/>
                <label htmlFor="user-email" className="add__label">Digite seu email:</label>
                <input ref={emailInput} type="email" id="user-email" className="h-11 border-2 rounded text-gray-100 mb-4 px-3" name="user-email" placeholder="Seu email" required/>
                <label htmlFor="user-password" className="add__label">Crie uma senha:</label>
                <input ref={passwordInput} onChange={handleInputChange} type="password" id="user-password" className="h-11 border-2 rounded text-gray-100 mb-1 px-3" name="user-password" placeholder="Sua senha" required/>
                {isPasswordShort && <p className="text-left text-alert mb-4 pl-2">A senha deve possuir mais que 6 caracteres</p>}
                <button type="submit" className="h-11 rounded bg-slate-800 my-2 hover:bg-slate-700 text-primary text-center">Criar conta</button>
                {isAccountCreated && <p className="text-center mt-3">Conta criada com sucesso! Você será redirecionado para a tela de login...</p>}
            </form>
        </main>
        <Link to={"/"} className="text-link-primary hover:text-link-secondary text-center block mx-auto mt-4">Voltar para a página inicial</Link>
    </>
    )
};

export default CreateAccount;
