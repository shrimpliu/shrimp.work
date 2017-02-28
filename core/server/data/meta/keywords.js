var labs            = require('../../utils/labs'),
    _ = require('lodash'),
    nodejieba = require('nodejieba'),
    config = require('../../config');

function getKeywords(data, root) {

    var context = root ? root.context : null;
    var keywords = [];

    if (_.includes(context, 'home') || _.includes(context, 'author')) {
        var keywordStr = config.theme.keywords;
        if (keywordStr) {
            keywords = keywordStr.split(', ');
        }
    } else if (data.post) {

        if (data.post.tags && data.post.tags.length > 0) {
            keywords = data.post.tags.reduce(function (tags, tag) {
                if (tag.visibility !== 'internal' || !labs.isSet('internalTags')) {
                    tags.push(tag.name);
                }
                return tags;
            }, []);
        }

        if (data.post.title) {
            //提取标题的关键字
            const extracts = nodejieba.extract(data.post.title, 6);
            extracts.forEach(function (extract) {
                keywords.push(extract.word);
            });
        }


    }
    return _.uniq(keywords);
}

module.exports = getKeywords;

