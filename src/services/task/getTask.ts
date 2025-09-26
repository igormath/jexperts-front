const baseUrl = process.env.BASE_URL;

async function getTask(email: string, token: string) {
    try {
        const response = await fetch(`${baseUrl}/task/${email}`, {
            method: "GET",
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
            error: 500,
            ok: false,
        };
    }
}

export default getTask;
