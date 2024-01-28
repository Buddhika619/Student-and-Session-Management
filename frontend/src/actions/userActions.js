import axios from 'axios'
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,

  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,


  userListRequest,
  userListSuccess,
  userListFail,


  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail

} from '../reducers/userSlice'


import {
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail
} from '../reducers/userUpdateSlice'


export const login = (loginState) => async (dispatch) => {
  try {
    dispatch(userLoginRequest())

    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      loginState,
      config
    )

    dispatch(userLoginSuccess(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      userLoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const logout = () => (dispatch) => {
//   dispatch(userDetailsReset())
 
  localStorage.removeItem('userInfo')
  dispatch(userLogout())
 

}

export const register = (signupState) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest())

    console.log(signupState)
    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      signupState,
      config
    )

    dispatch(userRegisterSuccess(data))

    dispatch(userLoginSuccess(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      userRegisterFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest())

    const {
      userLogin: { userInfo },
    } = getState()

 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch(userDetailsSuccess(data))
  } catch (error) {
    dispatch(
      userDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}


// export const updateUserProfile = (user) => async (dispatch, getState) => {
//   try {
//     dispatch(userUpdateRequest())

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }
//     console.log(user)

//     const { data } = await axios.put(`/api/users/profile`, user, config)

//     dispatch(userUpdateSuccess(data))
//     dispatch(userLoginSuccess(data))
//     dispatch(userDetailsSuccess(data))
//     localStorage.setItem('userInfo', JSON.stringify(data))
//   } catch (error) {
//     dispatch(
//       userUpdateFail(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       )
//     )
//   }
// }

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userListRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }


    const { data } = await axios.get(`/api/users`, config)

    dispatch(userListSuccess(data))
  } catch (error) {
    dispatch(
      userListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// // removeUserRequest,
// // removeUserSuccess,
// // removeUserFail

// export const removeUser = (ids) => async (dispatch, getState) => {
//   try {
//     dispatch(removeUserRequest())

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//         'data': ids
//       },
//     }

 
//     // await axios.delete(`/api/users/${id}`, config)
//     await axios.delete(`/api/users/`, config)
    
//     dispatch(removeUserSuccess())
//   } catch (error) {
//     dispatch(
//       removeUserFail(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       )
//     )
//   }
// }

// userUpdateAdminRequest,
//   userUpdateAdminSuccess,
//   userUpdateAdminFail

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

 
    const { data } = await axios.put(`/api/users/${user.id}`,user, config)
    
    dispatch(userUpdateSuccess(data))
  } catch (error) {
    dispatch(
      userUpdateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}