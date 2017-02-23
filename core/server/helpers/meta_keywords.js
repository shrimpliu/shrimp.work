// # Meta Keywords Helper
// Usage: `{{meta_keywords}}`

var getMetaDataKeywords = require('../data/meta/keywords');

function meta_keywords(options) {
    options = options || {};

    var keywords = getMetaDataKeywords(this, options.data.root) || null;
    if (keywords && keywords.length > 0) {
        keywords = keywords.join(', ');
    } else {
        keywords = '';
    }

    return keywords;
}

module.exports = meta_keywords;