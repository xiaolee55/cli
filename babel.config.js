module.exports = {
  presets: [
    ["@babel/preset-env", 
      {
        "useBuiltIns": "usage"  //按需引入polyfill，减少打包编译的体积
      }
    ]
  ],
  plugins: [
    // 添加这个
   '@babel/plugin-syntax-dynamic-import'
 ]
}