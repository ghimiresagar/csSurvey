export default {
    login: user => {
        return fetch('/', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401 )
                return res.json().then(data => data);
            else {
                return {
                    isAuthenticated: false, user: {username: ""}, message: { msgBody: "Error Loggin In!", msgError: true }
                }
            }
        });
    },
    logout: () => {
        return fetch('/logout')
            .then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/authenticated')
            .then(res => {
                if ( res.status !== 401 ){
                    return res.json().then(data => data);
                }
                else {
                    return {
                        isAuthenticated: false, user: {username: ""}
                    }
                }
            });
    }
}