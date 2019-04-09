if (process.env.NODE_ENV === 'production') {
    module.exports = require('./react-formutil.cjs.production.js');
} else {
    module.exports = require('./react-formutil.cjs.development.js');
}
