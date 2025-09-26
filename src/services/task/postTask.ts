const baseUrl = process.env.BASE_URL;

async function postTask(
    description: string,
    authorEmail: string,
    title: string,
    token: string,
) {
    try {
        const response = await fetch(`${baseUrl}/task`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                description: description,
                done: false,
                authorEmail: authorEmail,
                title: title,
            }),
        });
        const data = await response.json();
        return {
            data: data,
            status: response.status,
            ok: response.ok,
        };
    } catch (error) {
        console.error(error);
        return {
            data: error,
            status: 500,
            ok: false,
        };
    }
}

export default postTask;
