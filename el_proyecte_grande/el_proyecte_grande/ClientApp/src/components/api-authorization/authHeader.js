

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        return { headers: {Authorization: `Bearer ${user["message"]}`}};
    } else {
        return { headers : {} };
    }
}