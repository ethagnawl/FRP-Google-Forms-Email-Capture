var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.coffee$/, loader: "coffee-loader" }
        ]
    },
    resolve: {
        root: [path.join(__dirname, "bower_components")]
    }
}

new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "windows.jQuery": "jquery"
})
