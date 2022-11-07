
export const isAdmin = (array) => {
    return array.some(({name}) => name === "ROLE_ADMIN");
}