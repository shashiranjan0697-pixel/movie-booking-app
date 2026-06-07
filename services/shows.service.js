const Shows = require("../model/show.model");

const createShow = async (data) => {

    const show = await Shows.create(data);

    if (!show) {
        throw new Error("Invalid data");
    }

    return show;
};

module.exports = {
    createShow
};