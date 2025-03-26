/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
    module: {
        rules: [
            {
                resolve: {
                    alias: {
                        "foo": "./not-exist"
                    }
                },
            },
            {
                resolve: {
                    alias: {
                        "foo": "./exist"
                    }
                },
            },
        ]
    },
};
