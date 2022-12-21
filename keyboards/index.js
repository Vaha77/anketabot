const {Markup} = require("telegraf");

function getNumber() {
  return  Markup.keyboard([
    Markup.button.contactRequest("📲Telefon raqam yuborish")
  ]).resize()
}

module.exports = {
    getNumber
}