export async function serverRequests(method, location, details) {
    const token = sessionStorage.getItem('accessToken');
    if (method == 'GET') {
        try {
            const fetchResponse = await fetch(`http://localhost:3000/${location}`, {
                headers: {
                    'authorization': `Barear=${token}`,
                }
            })
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }
    }
    const settings = {
        method: method,
        headers: {
            'authorization': `Barear=${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details)
    };
    try {
        const fetchResponse = await fetch(`http://localhost:3000/${location}`, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }
}