import { userLoginUsingPost, getLoginUserUsingGet } from '@/api/userController'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { userAccount, userPassword } = userInfo
    return new Promise((resolve, reject) => {
      userLoginUsingPost({ userAccount: userAccount.trim(), userPassword: userPassword })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getLoginUserUsingGet()
        .then(response => {
          const { data } = response

          if (!data) {
            return reject('验证失败,请重新登录.')
          }

          commit('SET_USER_INFO', data)
          commit('SET_NAME', data.userName)
          commit('SET_AVATAR', data.imageUrl)

          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // 必须先删除token
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // 重置 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 必须先删除token
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

