const redirect = async (e) => {
e.preventDefault();
document.location.replace('/login');
};

document.querySelector('#login').addEventListener('click', redirect);