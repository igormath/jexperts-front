const baseUrl = import.meta.env.VITE_BASE_URL;

async function deleteUser(email: string, token: string) {
    try {
        const response = await fetch(`${baseUrl}/user/${email}`, {
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

export default deleteUser;
