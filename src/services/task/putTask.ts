const baseUrl = process.env.BASE_URL;

async function putTask(
    email: string,
    description: string,
    done: boolean,
    id: number,
    title: string,
    token: string,
) {
    try {
        const response = await fetch(`${baseUrl}/task/${email}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id: id,
                description: description,
                done: done,
                title: title,
            }),
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

export default putTask;
