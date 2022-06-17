import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { loginUser,getUserInfo } from "../services/api";

// Authentification Context handeling getting user information on each mount/reload , making sure Token still valid in case of a JWT with a expiry  
// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'token',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          userInfo(accessToken)
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (data) => {
    loginUser(data).then((user)=> {
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      })
      localStorage.setItem('accessToken',user?.id)
    }).catch(error => alert(error.message))
  }

  const userInfo = async (id) => {
    getUserInfo(id).then((user)=> {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          user,
          isAuthenticated: true,
        },
      });
    })
  }

  const logout = async () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('accessToken')
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'token',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
