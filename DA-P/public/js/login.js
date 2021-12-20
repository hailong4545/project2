const username = document.querySelector('#floatingInput');
const password = document.querySelector('#floatingPassword');
const btnSubmit = document.querySelector('#btn-submit');
const btnCloseToast = document.querySelector('.btn-close');

async function getUsers() {
    let data = await fetch('http://localhost:3000/api/users');
    let users = await data.json();
    return users;
}

btnCloseToast.addEventListener('click', (e) => {
    document.querySelector('.toast').style.display = 'none';
})

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    let data = await getUsers();
    let index = await data.findIndex(ele => ele.username == username.value && ele.password == password.value);
    if (index == -1) {
        console.log('khong ton tai');
        document.querySelector('.toast').style.display = 'block';
    }
    else {
        document.querySelector('form').submit();
    }
})
