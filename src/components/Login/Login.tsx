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
        if (emailInput.current?.value && passwordInput.current?.value){
            const response = await loginUser(emailInput.current.value, passwordInput.current.value);
            if (!response.ok){
                alert(`Houve um erro ao tentar realizar o login, tente novamente! ${response.data.error}`);
            } else {
                // Adicionar o valor da chave JWT ao localStorage.
                localStorage.setItem('jwt-key', JSON.stringify(response.data.token));
                navigate("/home", { state: { email: emailInput.current.value } });
            }
        }
    }

    return (
        <>
            <Header/>
            <main className="font-roboto">
                <p className="w-10/12 mx-auto mt-8 text-lg text-start font-light lg:text-center">Organize suas tarefas, alcance seus objetivos. Entre e faça o seu dia acontecer!</p>
                <div className="flex flex-col w-10/12 mt-16 mx-auto lg:w-1/2 lg:mx-auto lg:border-2 lg:border-slate-500 lg:rounded-md lg:p-5 2xl:w-1/3">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="user-email" className="flex flex-col">
                        <span>Email</span>
                        <input ref={emailInput} type="email" name="user-email" id="user-email" className="h-11 border-2 rounded text-gray-100 mb-4 px-3" placeholder="Seu email" required/>
                    </label>
                    <label htmlFor="user-password" className="flex flex-col">
                        <span>Senha</span>
                        <input ref={passwordInput} type="password" name="user-password" id="user-password" className="h-11 border-2 rounded mb-4 px-3" placeholder="Sua senha" required/>
                    </label>
                    <button type="submit" className="h-11 w-7/12 mx-auto block rounded bg-slate-800 my-2 hover:bg-slate-700 text-primary text-center">Entrar</button>
                </form>
                        <div className="flex flex-row my-5 justify-evenly">
                            <p>Não possui conta?</p>
                            <Link to={"/criar-conta"} className="text-link-primary hover:text-link-secondary text-center">Criar uma conta</Link>
                        </div>
                </div>
            </main>
        </>
  )
};

export default Login;
