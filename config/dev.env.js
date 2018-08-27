'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//more config
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
