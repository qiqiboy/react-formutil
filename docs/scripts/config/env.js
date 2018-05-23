var REACT_APP = /^(?:REACT_APP_|TIGER_)/i;

function getClientEnvironment(publicUrl) {
    return Object.keys(process.env)
        .filter(key => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {
                NODE_ENV: process.env.NODE_ENV || 'development',
                PUBLIC_URL: publicUrl
            }
        );
}

module.exports = getClientEnvironment;
