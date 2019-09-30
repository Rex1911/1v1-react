class Auth {
    constructor() {
        this.jwt = localStorage.getItem('jwt')
        this.jwt ? this.isLoggedIn = true : this.isLoggedIn = false;
    }

    login(jwt) {
        this.isLoggedIn = true;
        this.jwt = jwt;
        localStorage.setItem('jwt', jwt)
    }

    logout() {
        this.isLoggedIn = false;
        this.jwt = null;
        localStorage.removeItem('jwt')
    }
}

export default new Auth()