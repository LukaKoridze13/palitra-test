export const getUsers = () => {
    if (localStorage.getItem('lukakoridze-palitra') !== null) {
        return JSON.parse(localStorage.getItem('lukakoridze-palitra'))
    } else {
        localStorage.setItem('lukakoridze-palitra', JSON.stringify([]))
        return []
    }
};
export const createUser = (name,surname,email, password) => {
    let users = getUsers();
    users.push({ name,surname,email,password });
    localStorage.setItem('lukakoridze-palitra', JSON.stringify(users));
}
export const checkUser = (email) => {
    let users = getUsers();
    let exists = false;
    users.forEach((user) => {
        user.email === email && (exists = true);
    })
    if (exists) {
        return true
    } else {
        return false
    }
}
export const logIn = (email) => {
    localStorage.setItem('lukakoridze-palitra-log', 'logged')
    let users = getUsers();
    users.forEach((user) => {
        user.email === email && (user.logged = true);
    })
    localStorage.setItem('lukakoridze-palitra', JSON.stringify(users));
}
export const logOut = () => {
    localStorage.setItem('lukakoridze-palitra-log', 'not logged')
    let users = getUsers();
    users.forEach((user) => {
        user.logged = false;
    })
    localStorage.setItem('lukakoridze-palitra', JSON.stringify(users));
}
export const checkLogged = () => {
    if (localStorage.getItem('lukakoridze-palitra-log') === 'logged') {
        return true
    } else {
        return false
    }
}
export const checkLogin = (email, password) => {
    let users = getUsers()
    let valid=false;
    users.forEach((user)=>{
        if(email ===  user.email && user.password === password){
            valid = true;
        }
    })
    return valid
}
export const getUser = (email) => {
    let users = getUsers();
    let exists = false;
    let userFound;
    users.forEach((user) => {
        user.email === email && (exists = true);
        user.email === email && (userFound=user);
    })
    if (exists) {
        return userFound
    } else {
        return 'Not Found'
    }
}
export const changePassword = (email, newPassword) => {
    let users = getUsers();
    users = users.map((user)=>{
        if(user.email === email){
            user.password = newPassword
            return user
        }else{
            return user
        }
    })
    localStorage.setItem('lukakoridze-palitra', JSON.stringify(users));
}