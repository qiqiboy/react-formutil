if (process.env.NODE_ENV === 'production') {
    module.exports = require('./react-formutil.esm.production.js');
} else {
    module.exports = require('./react-formutil.esm.development.js');
}
