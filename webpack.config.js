const path = require('path');
const isProduction = process.env.NODE_ENV == 'production';
const config = {
    entry: './main.ts',
    output: {
        path: isProduction ? path.resolve(__dirname, 'dist/js') : path.resolve(__dirname, 'js'),
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
