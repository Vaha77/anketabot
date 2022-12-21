const {Scenes} = require("telegraf");
const {admin, allSendMessage,oneSendMessage,adminSendsetup2} = require("./admin")

const stage = new Scenes.Stage([
    require("./start"),
    admin,
    allSendMessage,
    oneSendMessage,
    adminSendsetup2,
    require("./setup2")
]);


module.exports = stage;