import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../services/user/getUser";
import TaskCard from "../TaskCard/TaskCard";
import postTask from "../../services/task/postTask";
import getAuthToken from "../../util/authToken";
import getTask from "../../services/task/getTask";

export interface TaskProps {
    id: number,
    description: string,
    done: boolean,
    authorEmail: string,
    title: string,
}

const Home = () => {
    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [isTaskCreated, setIsTaskCreated] = useState<boolean>(false);
    const taskDescriptionInput = useRef<HTMLInputElement>(null);
    const taskTitleInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getAuthToken();
            if (email){
                try{
                    const userResponse = await getUser(email);
                    if (userResponse.ok && userResponse.data){
                        setName(userResponse.data.name);
                    } else{
                        alert(`Ocorreu um erro ao carregar o usuário, tente novamente!`);
                    }
                } catch (error){
                    alert(`Ocorreu um erro ao carregar o usuário, tente novamente! ${error}`);
                }
            }

            if (token){
                try{
                    const taskResponse = await getTask(email, token);
                    if (taskResponse.ok && taskResponse.data){
                        setTasks(taskResponse.data);
                    } else{
                        alert(`Ocorreu um erro ao carregar as tasks, tente novamente!`);
                    }
                } catch (error){
                    alert(`Ocorreu um erro ao carregar as tasks, tente novamente! ${error}`);
                }
            }
        }

        fetchUser();
    }, [email])

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    const handleEdit = () =>{
        navigate("/edit", { state: { email: email, name: name } });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getAuthToken();
        if (!token) {
            alert("Falha ao autenticar o usuário. Saia da conta e tente novamente.");
            return;
        }
        if (taskDescriptionInput.current?.value && taskTitleInput.current?.value){
            const response = await postTask(taskDescriptionInput.current.value, email, taskTitleInput.current.value, token);
            if (!response.ok){
                alert(`Houve um erro ao criar a tarefa, tente novamente. ${response.data.error}`);
            } else {
                setTasks(prevTasks => [...prevTasks, response.data]);
                setIsTaskCreated(true);
                setTimeout(() => {
                    setIsTaskCreated(false);
                }, 3000);
            }        
        }
    }

    const handleTaskDelete = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const handleTaskUpdate = (updatedTask: TaskProps) => {
        setTasks(prevTasks => prevTasks.map(task => (
            task.id === updatedTask.id ? updatedTask : task
        )
    ));
    }

    return (
    <>
        <Header/>
        <nav>
            <ul className="h-10 flex justify-around lg:justify-between bg-zinc-700">
                <li className="w-1/2 bg-zinc-700 hover:bg-zinc-600 text-primary lg:w-3/12">
                    <button onClick={handleEdit} className="text-center w-full h-full">Editar perfil</button>
                </li>
                <li className="w-1/2 bg-zinc-700 hover:bg-zinc-600 text-primary lg:w-3/12">
                    <button onClick={handleLogout} className="text-center w-full h-full">Sair</button>
                </li>

            </ul>
        </nav>
        <main className="font-roboto">
            <h2 className="m-4 text-xl my-4 font-medium md:text-center">Bem-vindo, {name}.</h2>
            <p className="text-lg mt-10 mb-6 text-center">Crie novas tarefas: </p>
            <form onSubmit={handleSubmit} id="task-create" className="flex flex-col w-10/12 mt-5 mx-auto lg:w-1/2 lg:mx-auto lg:border-2 lg:border-slate-500 lg:rounded-md lg:p-5 2xl:w-1/3">
            <label htmlFor="new-task" className="flex flex-col">
                    <span>Título da tarefa:</span>
                    <input ref={taskTitleInput} type="text" id="task-title" className="h-11 border-2 rounded mb-4 px-3" name="task-title" placeholder="Título da tarefa" required/>
                </label>
                <label htmlFor="new-task" className="flex flex-col">
                    <span>Descreva a tarefa:</span>
                    <input ref={taskDescriptionInput} type="text" id="task-description" className="h-11 border-2 rounded mb-4 px-3" name="task-description" placeholder="Descrição da tarefa" required/>
                </label>
                <button type="submit" className="h-11 w-7/12 mx-auto block rounded bg-slate-800 my-2 hover:bg-slate-700 text-primary text-center">Criar nova tarefa</button>
            </form>
            
            {isTaskCreated && <p className="text-center mt-4">Tarefa criada com sucesso!</p>}

            <ul className="p-6">
                {tasks.map((task) => (
                    <TaskCard 
                    key={task.id}
                    authorEmail={task.authorEmail}
                    id={task.id}
                    done={task.done}
                    title={task.title}
                    onTaskDeleted={() => handleTaskDelete(task.id)}
                    onTaskUpdated={handleTaskUpdate}
                    >
                    {task.description}
                    </TaskCard>    
                ))}
            </ul>
        </main>
    </>
    )
}

export default Home;
