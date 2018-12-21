export default function userReducer(state = {
  activeOrderChecked: false,
  loggedIn: false,
  id: '',
  name: '',
  email: '',
}, action) {

  switch(action.type) {

    case 'START_CREATE_USER_REQUEST':
      return state

    case 'START_LOGIN_REQUEST':
      return state

    case 'LOGIN_PENDING_TOKEN':
      return {...state, loggedIn: false, id: action.user.id, name: action.user.name, email: action.user.email, loginFlash: null}

    case 'LOGIN_FAILURE':
      console.log('failed')
      return {...state, loginFlash: action.message}

    case 'START_LOGOUT_REQUEST':
      return state

    case 'LOGOUT_SUCCESS':
      return {
        activeOrderChecked: false,
        loggedIn: false,
        id: '',
        name: '',
        email: ''
      }

    case 'CREATE_USER_AUTH_SUCCESS_AND_LOGIN':
      return {...state, isAuthenticated: true, loggedIn: true, activeOrderChecked: true}

    case 'AUTH_SUCCESS_AND_LOGIN':
      return {...state, isAuthenticated: true, loggedIn: true}

    case 'GET_ACTIVE_ORDER_SUCCESS':
      return {
        ...state,
        activeOrderChecked: true
      }

    case 'QUERY_INITIAL_AUTH':
    console.log('Blahasdasdfasd')
      if (action.isAuthenticated) {
        return {...state, loggedIn: true}
      } else {
        return state
      }

    case 'LOAD_USER_DATA':
      return {...state, id: action.user.id, name: action.user.name, email: action.user.email}

    default:
      return state

  }
}
