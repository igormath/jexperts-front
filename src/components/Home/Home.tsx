import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../services/user/getUser";
import TaskCard from "../TaskCard/TaskCard";
import postTask from "../../services/task/postTask";
import getAuthToken from "../../util/authToken";
import getTask from "../../services/task/getTask";

export interface TaskProps {
    id: number;
    description: string;
    done: boolean;
    authorEmail: string;
    title: string;
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
            if (email) {
                try {
                    const userResponse = await getUser(email);
                    if (userResponse.ok && userResponse.data) {
                        setName(userResponse.data.name);
                    } else {
                        alert(
                            `Ocorreu um erro ao carregar o usuário, tente novamente!`,
                        );
                    }
                } catch (error) {
                    alert(
                        `Ocorreu um erro ao carregar o usuário, tente novamente! ${error}`,
                    );
                }
            }

            if (token) {
                try {
                    const taskResponse = await getTask(email, token);
                    if (taskResponse.ok && taskResponse.data) {
                        setTasks(taskResponse.data);
                    } else {
                        alert(
                            `Ocorreu um erro ao carregar as tasks, tente novamente!`,
                        );
                    }
                } catch (error) {
                    alert(
                        `Ocorreu um erro ao carregar as tasks, tente novamente! ${error}`,
                    );
                }
            }
        };

        fetchUser();
    }, [email]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const handleEdit = () => {
        navigate("/edit", { state: { email: email, name: name } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getAuthToken();
        if (!token) {
            alert(
                "Falha ao autenticar o usuário. Saia da conta e tente novamente.",
            );
            return;
        }
        if (
            taskDescriptionInput.current?.value &&
            taskTitleInput.current?.value
        ) {
            const response = await postTask(
                taskDescriptionInput.current.value,
                email,
                taskTitleInput.current.value,
                token,
            );
            if (!response.ok) {
                alert(
                    `Houve um erro ao criar a tarefa, tente novamente. ${response.data.error}`,
                );
            } else {
                setTasks((prevTasks) => [...prevTasks, response.data]);
                setIsTaskCreated(true);
                setTimeout(() => {
                    setIsTaskCreated(false);
                }, 3000);
            }
        }
    };

    const handleTaskDelete = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const handleTaskUpdate = (updatedTask: TaskProps) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task,
            ),
        );
    };

    return (
        <div className="bg-slate-50 min-h-screen font-roboto text-slate-800">
            <Header />
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleEdit}
                                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Editar Perfil
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-slate-800 text-primary text-sm font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-900">
                        Bem-vindo, {name}.
                    </h2>
                    <p className="mt-2 text-lg text-slate-600">
                        Aqui estão suas tarefas. Adicione, edite e complete-as.
                    </p>

                    <div className="mt-10">
                        <div className="bg-white p-8 border-2 border-slate-200 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-slate-900">
                                Criar nova tarefa
                            </h3>
                            <form
                                onSubmit={handleSubmit}
                                id="task-create"
                                className="mt-6 space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="task-title"
                                        className="text-sm font-medium text-slate-700"
                                    >
                                        Título da tarefa
                                    </label>
                                    <input
                                        ref={taskTitleInput}
                                        type="text"
                                        id="task-title"
                                        className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                        name="task-title"
                                        placeholder="Ex: Comprar leite"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="task-description"
                                        className="text-sm font-medium text-slate-700"
                                    >
                                        Descreva a tarefa
                                    </label>
                                    <input
                                        ref={taskDescriptionInput}
                                        type="text"
                                        id="task-description"
                                        className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                        name="task-description"
                                        placeholder="Ex: Ir ao mercado e comprar leite integral"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center text-primary bg-slate-800 font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-slate-700 transition-colors duration-300"
                                >
                                    Criar nova tarefa
                                </button>
                            </form>
                            {isTaskCreated && (
                                <p className="text-center text-sm text-green-600 mt-4">
                                    Tarefa criada com sucesso!
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-slate-900">
                            Sua Lista de Tarefas
                        </h3>
                        <ul className="mt-6 space-y-4">
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        authorEmail={task.authorEmail}
                                        id={task.id}
                                        done={task.done}
                                        title={task.title}
                                        onTaskDeleted={() =>
                                            handleTaskDelete(task.id)
                                        }
                                        onTaskUpdated={handleTaskUpdate}
                                    >
                                        {task.description}
                                    </TaskCard>
                                ))
                            ) : (
                                <p className="text-slate-500">
                                    Você ainda não tem tarefas. Crie uma acima!
                                </p>
                            )}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
