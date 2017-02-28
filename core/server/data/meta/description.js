var _ = require('lodash'),
    htmlToText = require('html-to-text'),
    config = require('../../config');

function getDescription(data, root) {
    var description = '',
        context = root ? root.context : null;

    if (data.meta_description) {
        description = data.meta_description;
    } else if (_.includes(context, 'paged')) {
        description = '';
    } else if (_.includes(context, 'home')) {
        description = config.theme.description;
    } else if (_.includes(context, 'author') && data.author) {
        description = data.author.meta_description || data.author.bio;
    } else if (_.includes(context, 'tag') && data.tag) {
        description = data.tag.meta_description || data.tag.description;
    } else if ((_.includes(context, 'post') || _.includes(context, 'page')) && data.post) {
        description = data.post.meta_description;
        //从内容中提取description
        if (!description && data.post.html) {
            var text = htmlToText.fromString(data.post.html, {wordwrap: 156}).replace(/\n+/g, ' ');
            text = text.replace(/\** +/g, ' ');
            description = text.trim().substring(0, 156);
        }
    }

    return (description || '').trim();
}

module.exports = getDescription;
