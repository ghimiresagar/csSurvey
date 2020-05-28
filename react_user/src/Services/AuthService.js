export default {
    login: user => {
        return fetch('http://localhost:9000/users', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Context-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    logout: () => {
        return fetch('http://localhost:9000/users/logout')
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('http://localhost:9000/users/authenticated')
                .then(res => {
                    if (res.status !== 401 )
                        return res.json().then(data => data);
                    else 
                        return {
                            isAuthenticated: false, user: {username: ""}
                        }
                });
    }
}