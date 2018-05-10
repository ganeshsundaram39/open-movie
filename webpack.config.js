const path = require('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const webpack = require('webpack');

module.exports ={
    entry:'./src/js/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/bundle.js'
    },
    devServer:{
        contentBase:'./dist/'
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        })
    ]
};