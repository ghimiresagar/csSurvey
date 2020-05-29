export default {
    login: user => {
        return fetch('http://localhost:9000/users', {
            method: 'post',
            body: JSON.stringify(user),
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: {
                 'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401 )
                return res.json().then(data => data);
            else {
                return {
                    isAuthenticated: false, user: {username: ""}
                }
            }
        });
    },
    logout: () => {
        return fetch('http://localhost:9000/users/logout')
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('http://localhost:9000/users/authenticated', { 
                    headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}, 
                })
                .then(res => {
                    console.log('authenticated')
                    if ( res.status !== 401 ){
                        console.log('not 401')
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