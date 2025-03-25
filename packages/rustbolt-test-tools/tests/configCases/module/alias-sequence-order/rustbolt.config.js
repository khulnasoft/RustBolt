/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
    module: {
        rules: [
            {
                resolve: {
                    alias: {
                        "foo/bar": "./exist"
                    }
                },
            },
            {
                resolve: {
                    alias: {
                        "foo": "./not-exist"
                    }
                },
            },
        ]
    },
};
