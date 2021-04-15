// const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-pxtorem');
module.exports = {
    // 公共路径
    publicPath: './',
    // 打包路径
    outputDir: 'dist',
    // 静态资源路径
    assetsDir: 'static',
    lintOnSave: false,
    productionSourceMap: false, // 不需要生产环境的 source map 设置false（减小dist文件大小，加速构建）
    devServer: {
        disableHostCheck: true,
        // open: true,  // npm run serve后自动打开页面
        // host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
        port: 8080, // 开发服务器运行端口号
        proxy: {
            //配置跨域
            '/api': {
                // target: "http://192.168.0.124:9017",//长江
                // target: "http://192.168.0.172:9017",//岳魏
                // target: 'http://192.168.0.179:9017', //刘利
                target: 'http://192.168.0.195:9017', //tang
                // ws:true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    configureWebpack: {
        performance: {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            },
        },
        performance: {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            },
        },
    },
};
