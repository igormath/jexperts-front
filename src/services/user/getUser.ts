const baseUrl = import.meta.env.VITE_BASE_URL;

async function getUser(email: string) {
    try {
        const response = await fetch(`${baseUrl}/user/${email}`);
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

export { getUser };
