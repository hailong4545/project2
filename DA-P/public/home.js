const formLogin = document.querySelector('#form-login');
const formSignUp = document.querySelector('#form-signup');

const login = document.querySelector('#login');
const signup = document.querySelector('#signup');

const usernameLogin = document.querySelector('#login-username');
const passwordLogin = document.querySelector('#login-password');

console.log([login, signup]);

login.onclick = (e) => {
    formLogin.style.display = "block";
    formSignUp.style.display = 'none';
    login.style.fontWeight = 'bold';
    signup.style.fontWeight = 'normal';
}

signup.onclick = () => {
    formLogin.style.display = "none";
    formSignUp.style.display = 'block';
    login.style.fontWeight = 'normal';
    signup.style.fontWeight = 'bold';
}

formLogin.onsubmit = async (e) => {
    let username = usernameLogin.value;
    let password = passwordLogin.value;

    if (!username || !password) {
        e.preventDefault();
    }
    else {
        e.preventDefault();
        var data = await fetch('http://localhost:3000/users');
        data = await data.json();
        let flag = await data.find((user) => user.username === username && user.password === password);

        console.log(flag);
        try {
            if (!flag.username) {
                e.returnValue = true;
                // window.location = 'http://localhost:3001/home';
            }
            else {
                console.log(flag);
            }
        }
        catch (err) {
            // window.location = 'http://localhost:3001/home';
            e.returnValue = true;
        }

    }
}