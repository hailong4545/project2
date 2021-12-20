async function getProjects() {
    let data = await fetch('http://localhost:3000/api/projects');
    let projects = await data.json();
    return projects;
}

const code = document.querySelector('#code');
const btnSubmit = document.querySelector('#btn-submit');

const toast = document.querySelector('.toast');

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('1');
    let projects = await getProjects();
    let index = projects.findIndex(p => p.id == code.value && p.status == 'start');
    if (index != -1) {
        window.location = 'http://localhost:3003/game&code='+code.value;
    }
    else {
        toast.style.display = 'block';
    }
})


const btnCloseToast = document.querySelector('.btn-close');
btnCloseToast.addEventListener('click', (e) => {
    document.querySelector('.toast').style.display = 'none';
})
