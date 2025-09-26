const baseUrl = process.env.BASE_URL;

async function deleteTask(email: string, id: number, token: string) {
    try {
        const response = await fetch(`${baseUrl}/task/${email}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return {
            data,
            status: response.status,
            ok: response.ok,
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
            status: 500,
            ok: false,
        };
    }
}

export default deleteTask;
