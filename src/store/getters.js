const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  organization: state => state.user.organization,
  name: state => state.user.username,
  token: state => state.user.token,
  role: state => state.user.role,
  avatar: state => state.user.avatar
}
export default getters
