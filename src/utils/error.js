export function handleError({ message, code }) {
  switch (code) {
    case 101:
      return '用户名或密码错误'
  }
}
