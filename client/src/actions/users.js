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
      dispatch({type: 'LOGIN_PENDING_TOKEN', user: resp.user})
      getAuthToken(dispatch, email, password);
    })
    .then(() => {
      dispatch({type: 'CREATE_USER_AUTH_SUCCESS_AND_LOGIN'})
    })
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
      console.log(resp);
      dispatch({type: 'LOGIN_PENDING_TOKEN', user: resp.user})
      getAuthToken(dispatch, email, password);
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
    localStorage.setItem("jwt", token.jwt);
    dispatch({type: 'AUTH_SUCCESS_AND_LOGIN'});
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

export function initialAuth(dispatch) {
  return (dispatch) => {
    let auth = checkAuth();
    dispatch({type: 'QUERY_INITIAL_AUTH', isAuthenticated: auth});
    if (auth) {
      return fetch('/api/v1/user_data', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(user => {
        dispatch({type: 'LOAD_USER_DATA', user: user});
        return user
      })
      .then(() => {
        dispatch({type: 'START_GET_ACTIVE_ORDER_REQUEST'})
        return fetch('/api/v1/active_order', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(resp => {
          console.log('Active Order: ', resp)
          dispatch({type: 'GET_ACTIVE_ORDER_SUCCESS', order: resp});
        })
      })
    }
  }
}

export function clearAuth() {
  localStorage.removeItem('jwt');
  return checkAuth();
}
