const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }
}

// module.exports = {
  
//   devServer: {
//       proxy: ''
//   },

// }




// module.exports = {
//   devServer: {
//     proxy: {
//       '/dev': {
//         target: 'https://rwr6c3pzc3.execute-api.us-east-2.amazonaws.com',
//         changeOrigin: true
        
//       }
//     }
//   }
// }

// module.exports = {
//   devServer: {
//     proxy: {
//       '/transform': {
//         target: 'https://y6n0hclun4.execute-api.us-east-2.amazonaws.com/dev',
//         changeOrigin: true
//       }
//     }
//   }
// }

// module.exports = {
//   configureWebpack: {
//     devtool: 'source-map'
//   }
// }