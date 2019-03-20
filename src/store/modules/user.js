import { loginByUsername, logout, getUserInfo, getUserOrg } from '@/api/login'
import { queryRootOrg } from '@/api/organization'
import { handleError } from '@/utils/error'
import { cleanData } from '@/utils/tools'
import { Message } from 'element-ui'

const user = {
  state: {
    // user: '',
    // status: '',
    // code: '',
    // token: getToken(),
    // name: '',
    // introduction: '',
    // roles: [],
    // setting: {
    //   articlePlatform: []
    // }
    username: '',
    organization: {},
    role: -1,
    token: undefined,
    avatar: ''
  },

  mutations: {
    // SET_CODE: (state, code) => {
    //   state.code = code
    // },

    // SET_INTRODUCTION: (state, introduction) => {
    //   state.introduction = introduction
    // },
    // SET_SETTING: (state, setting) => {
    //   state.setting = setting
    // },
    // SET_STATUS: (state, status) => {
    //   state.status = status
    // },
    SET_NAME: (state, name) => {
      state.username = name
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_ORG: (state, org) => {
      state.organization = org
    }
  },

  actions: {
    // 用户名登录
    async LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      await loginByUsername(username, userInfo.password).catch(
        parseError => {
          Message({
            message: handleError(parseError),
            type: 'error',
            duration: 5 * 1000
          })
        }
      )
    },
    // 获取用户信息
    async GetUserInfo({ commit, state }) {
      const parse_user = getUserInfo()
      const { username, role, sessionToken } = parse_user.toJSON()
      commit('SET_ROLE', role)
      commit('SET_NAME', username)
      commit('SET_TOKEN', sessionToken)
      let org = parse_user.get('organization')
      if (org) {
        org = await org.fetch()
        org = cleanData({ ...org.toJSON(), className: org.className })
        commit('SET_ORG', org)
      } else {
        org = await queryRootOrg()
        if (org) {
          org = cleanData({ ...org.toJSON(), className: org.className })
          commit('SET_ORG', org)
        }
      }
      return { name, org }
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
      return logout()
        .then(res => {
          commit('SET_ROLE', -1)
          commit('SET_NAME', '')
          commit('SET_ORG', {})
        })
        .catch(parseError => {
          Message({
            message: handleError(parseError),
            type: 'error',
            duration: 5 * 1000
          })
        })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
