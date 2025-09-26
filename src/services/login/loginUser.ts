const baseUrl = import.meta.env.VITE_BASE_URL;

async function loginUser(email: string, password: string) {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
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

export default loginUser;
