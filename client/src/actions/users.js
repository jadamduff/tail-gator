export function createUser(name, email, password) {
  return (dispatch) => {
    dispatch({type: 'START_CREATE_USER_REQUEST'});
    let body = JSON.stringify({user: {name: name, email: email, password: password}})
    return fetch('/api/v1/users',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }
    )
    .then(response => response.json())
    .then((resp) => {
        dispatch({type: 'CREATE_USER_SUCCESS', user: resp.user})
        return getAuthToken(dispatch, resp.user.email, password);
      }
    )
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch({type: 'START_LOGIN_REQUEST'});
    let body = JSON.stringify({email: email, password: password})
    return fetch('/api/v1/login',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }
    )
    .then(response => response.json())
    .then((resp) => {
      console.log(resp)
      if (resp.status === "Success") {
        dispatch({type: 'LOGIN_SUCCESS', user: resp.user})
        return getAuthToken(dispatch, resp.user.email, password);
      } else {
        console.log(resp.message)
        dispatch({type: 'LOGIN_FAILURE', message: resp.message})
      }
    })
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({type: 'START_LOGOUT_REQUEST'});
    return fetch('/api/v1/logout')
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === "Success") {
        dispatch({type: 'LOGOUT_SUCCESS'})
        localStorage.removeItem('jwt');
      }
    })
  }
}

export function getAuthToken(dispatch, email, password) {
  const request = JSON.stringify({"auth": {"email": email, "password": password}});
  return fetch('/api/user_token',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: request
    }
  )
  .then(response => response.json())
  .then((token) => {
    dispatch({type: 'AUTH_SUCCESS'});
    localStorage.setItem("jwt", token.jwt);
    console.log(localStorage.getItem('jwt'));
  });
}

export function checkAuth() {
  if (localStorage.getItem("jwt") !== null) {
    console.log('auth exists', localStorage.getItem("jwt"))
    return true
  } else {
    console.log('no auth', localStorage.getItem("jwt"))
    return false
  }
}

export function initialAuth() {
  return (dispatch) => {
    dispatch({type: 'QUERY_INITIAL_AUTH', isAuthenticated: checkAuth()});
  }
}

export function clearAuth() {
  localStorage.removeItem('jwt');
  return checkAuth();
}
