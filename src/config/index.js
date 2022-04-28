const modeUrlObj = {
  // 生产环境
  'production': {
    baseURL: 'http://10.10.11.241:2001/api/',
    authBaseURL: ''
  },
  // 开发环境
  'development': {
    // baseURL: 'http://10.1.5.156:8000/jfyf',//孙少鹏
    //baseURL: 'http://10.1.5.203:8000/jfyf',//杨磊
    baseURL: 'http://10.1.5.37:8000/jfyf',//荆蔚杰
    authBaseURL: ''
  },
  // 测试环境
  'test': {
    // baseURL: 'http://192.168.31.110:2001/api/',
    baseURL: 'http://10.10.11.241:2001/api/',
    authBaseURL: ''
  }
}
export default modeUrlObj[process.env.NODE_ENV]