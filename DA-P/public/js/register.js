const username = document.querySelector('#floatingInput');
const password = document.querySelector('#floatingPassword');
const confimPassword = document.querySelector('#floatingRePassword');
const btnSubmit = document.querySelector('#btn-submit');
const btnCloseToast = document.querySelector('.btn-close');

async function getUsers() {
    let data = await fetch('http://localhost:3000/api/users');
    let users = await data.json();
    return users;
}

async function appendUsers(id, username, password) {
    let sendRequest = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id, username: username, password:password}),
    })

    let users = await sendRequest.json();
    return users;
}

function show_toast(display, content) {
    document.querySelector('.toast').style.display = display;
    document.querySelector('.toast-body').innerText = content;
}

btnCloseToast.addEventListener('click', (e) => {
    show_toast('none', '');
})

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    let data = await getUsers();
    if (password.value == confimPassword.value) {
        let index = await data.findIndex(ele => ele.username == username.value);
        if (index != -1) {
            show_toast('block', 'Tài khoản đã tồn tại');
        }
        else {
            let sendRequest = await appendUsers(data.length + 1,username.value, password.value);
            console.log(sendRequest);
            document.querySelector('form').submit();
            
        }
    }
    else {
        show_toast('block', 'Mật khẩu không trùng khớp');
    }
})
