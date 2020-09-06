import axios, {post} from 'axios';

const role = {
    admin: 'ROLE_ADMIN',
    user: 'ROLE_USER'
};

export const authService = {
    login,
    logout,
    isGranted,
    isAdmin,
    isUser,
    tokenHeader,
    isLogged,
    role
};

function login(username, password) {
    return post('/login', {
        username: username,
        password: password
    })
        .then(
            res => {
                let roles = {};
                res.data.roles.map(r => roles[r] = true);

                const user = {
                    token: res.data.token,
                    roles: roles
                };
                localStorage.setItem("user", JSON.stringify(user));

                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

                return user;
            }
        );
}

function logout() {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem("user");
}

function isLogged() {
    return Boolean(localStorage.getItem("user"));
}

function isAdmin() {
    return isGranted(role.admin);
}

function isUser() {
    return isGranted(role.user);
}

function isGranted(role) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return false;
    }

    return user.roles && user.roles[role];
}

function tokenHeader() {
    const token = getToken();
    return token ? 'Bearer ' + token : '';
}

function getToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        return user.token ? user.token : '';
    }

    return '';
}
