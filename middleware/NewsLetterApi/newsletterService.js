const Newsletter = require('./newsletterSchema');

const createNewsletter = (title, content) => {
    const newsletter = new Newsletter({
        title,
        content,
    });

    return newsletter.save();
};

const getNewsletters = () => {
    return Newsletter.find().sort({ date: -1 });
};

module.exports = {
    createNewsletter,
    getNewsletters,
};
