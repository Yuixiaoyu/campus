const { generateService } = require('@umijs/openapi')

// generateService({
//   requestLibPath: "import request from '@/utils/request'",
//   schemaPath: 'https://campus.fybreeze.cn/api/v2/api-docs',
//   serversPath: './src',
//   hook: {
//     customFunctionName: (data) => {
//       return data.operationId
//     }
//   },
//   type: 'js'
// })

generateService({
  requestLibPath: "import request from '@/utils/request'",
  schemaPath: 'http://localhost:8090/api/v2/api-docs',
  serversPath: './src',
  hook: {
    customFunctionName: (data) => {
      return data.operationId
    }
  },
  type: 'js'
})



