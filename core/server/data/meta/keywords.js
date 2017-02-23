var labs            = require('../../utils/labs'),
    _ = require('lodash'),
    config = require('../../config');

function getKeywords(data, root) {

    var context = root ? root.context : null;
    var keywords = [];

    if (_.includes(context, 'home') || _.includes(context, 'author')) {
        var keywordStr = config.theme.keywords;
        if (keywordStr) {
            keywords = keywordStr.split(', ');
        }
    } else if (data.post && data.post.tags && data.post.tags.length > 0) {
        return data.post.tags.reduce(function (tags, tag) {
            if (tag.visibility !== 'internal' || !labs.isSet('internalTags')) {
                tags.push(tag.name);
            }
            return tags;
        }, []);
    }
    return keywords;
}

module.exports = getKeywords;

