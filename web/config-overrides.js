const webpack = require("webpack");

module.exports = function override(config) {
    config.resolve.fallback = Object.assign(config.resolve.fallback || {}, {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
        //'process/browser': require.resolve('process/browser'),
    });

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],

            T: ["dreamer-common-def", "T"],
            getRandom: ["dreamer-common-def", "getRandom"],
            getAxis: ["dreamer-common-def", "getAxis"],
            matrix2D: ["dreamer-common-def", "matrix2D"],
            matrix3D: ["dreamer-common-def", "matrix3D"],
            matrixCss: ["dreamer-common-def", "matrixCss"],
            determinant: ["dreamer-common-def", "determinant"],
            adjoint: ["dreamer-common-def", "adjoint"],
            perspectiveNO: ["dreamer-common-def", "perspectiveNO"],
            runtimeDecorator: ["dreamer-common-def", "runtimeDecorator"],

            REACT_APP_PROJECT_TITLE: JSON.stringify( process.env.REACT_APP_PROJECT_TITLE ),
            REACT_APP_PROJECT_LOGO: JSON.stringify( process.env.REACT_APP_PROJECT_LOGO ),
        }),
        new webpack.DefinePlugin({
            //store
            REACT_APP_STORE_TEST: JSON.stringify( process.env.REACT_APP_STORE_TEST ),
        }),
    ]);

    return config;
};