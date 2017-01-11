module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
        ]
    }
}
