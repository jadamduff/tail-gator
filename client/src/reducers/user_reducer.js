export default function userReducer(state = {
  loggedIn: false,
  id: '',
  name: '',
  email: '',
}, action) {

  switch(action.type) {

    case 'START_CREATE_USER_REQUEST':
      return {}

    case 'CREATE_USER_SUCCESS':
      return {...state, loggedIn: true, id: action.user.id, name: action.user.name, email: action.user.email}

    case 'START_LOGIN_REQUEST':
      return {}

    case 'LOGIN_SUCCESS':
      return {...state, loggedIn: true, id: action.user.id, name: action.user.name, email: action.user.email, loginFlash: null}

    case 'LOGIN_FAILURE':
      console.log('failed')
      return {...state, loginFlash: action.message}

    case 'START_LOGOUT_REQUEST':
      return {}

    case 'LOGOUT_SUCCESS':
      return {
        loggedIn: false,
        id: '',
        name: '',
        email: ''
      }

    case 'AUTH_SUCCESS':
      return {...state, isAuthenticated: true}

    case 'QUERY_INITIAL_AUTH':
      if (action.isAuthenticated) {
        return {...state, loggedIn: true}
      } else {
        return state
      }

    default:
      return state

  }
}
