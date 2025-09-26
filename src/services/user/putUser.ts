const baseUrl = process.env.BASE_URL;

async function putUser(
    email: string,
    name: string,
    password: string,
    token: string,
) {
    try {
        const response = await fetch(`${baseUrl}/user/${email}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                password: password,
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

export default putUser;
