if (process.env.NODE_ENV === 'production') {
    module.exports = require('./react-formutil.umd.production.js');
} else {
    module.exports = require('./react-formutil.umd.development.js');
}

