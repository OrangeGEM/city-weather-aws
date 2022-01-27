const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
	resolve: {
        fallback: {
            "timers": require.resolve("timers-browserify"),
            "stream": require.resolve("stream-browserify")
        }
    },
	plugins: [
		new NodePolyfillPlugin({
            excludeAliases: ["timers"]
        })
	]
}