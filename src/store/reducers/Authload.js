export const Authload = async () => {
    await JSON.parse(localStorage.getItem('user'));
    return Authload;
};

export const Reload = () => {
    window.location.reload();
};

export default Authload;
