const errorRedirectHandler = ((HttpStatusCode) => {
    localStorage.removeItem("access_token")
    if (HttpStatusCode === 403) {
            alert("You will be redirected to login page because your access-token is not valid")
            window.location.replace("http://freemath.online/login")
        } else if (HttpStatusCode === 401) {
            alert("You are not allowed to access here")
            window.location.replace("http://freemath.online/problems")
        }
    })

export {errorRedirectHandler}