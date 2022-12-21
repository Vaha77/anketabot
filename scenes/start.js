const {Markup, Scenes} = require("telegraf");
const Users = require("../models/users");
const {getNumber} = require("../keyboards");

const start = new Scenes.WizardScene(
"start",
async ctx => {
const user = await Users.findOne({user_id:ctx.from.id});
if(user && user.isAdmin) return ctx.scene.enter("admin");
let txt = `Assalomu aleykum, hurmatli ${ctx.from.first_name}
Operator lavozimi  uchun anketa to'ldiring`;
await ctx.replyWithHTML(txt);
txt = `To'liq Ism Familyangizni kiriting.`;
await ctx.replyWithHTML(txt);
return ctx.wizard.next();
},

async ctx => {
if(!ctx.message) return;
if(ctx.message.text == "/start") return ctx.scene.reenter();
const {id, username} = ctx.from;
 ctx.wizard.state.user = {id,username, first_name:ctx.message.text};
 txt = `Bog'lanish uchun <b>Telefon raqamingizni</b>  kiriting.`;
 await ctx.replyWithHTML(txt,getNumber())
  return ctx.wizard.next();
},


async ctx => {
    if(!ctx.message) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
    let txt = `Iltimos ko'rsatilgan tugma orqali telefon raqamingizni yuboring👇`;
    if(!ctx.message.contact) return ctx.reply(txt);
     ctx.wizard.state.user.phone = ctx.message.contact.phone_number;
      txt = `<b>1-Savol</b>\n\nSotuv bo'yicha tajribangiz bormi ?`;
   await ctx.replyWithHTML(txt, {
    reply_markup:{
        remove_keyboard:true
    }
   });
   return ctx.wizard.next();
},

async ctx => {
    if(!ctx.message) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
    ctx.wizard.state.user.quiz1 = ctx.message.text;
   let txt = `<b>2-Savol</b>\n\nSotuv bo'yicha qo'shimcha kurslarda o'qiganmisiz ?`;
   await ctx.replyWithHTML(txt);
   return ctx.wizard.next();
},

async ctx => {
    if(!ctx.message) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
    ctx.wizard.state.user.quiz2 = ctx.message.text;
    let txt = `<b>3-Savol</b>\n\nE'tirozlar bilan ishlay olasizmi ?`;
    await ctx.replyWithHTML(txt);
    return ctx.wizard.next();
},

async ctx => {
    if(!ctx.message) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
    ctx.wizard.state.user.quiz3 = ctx.message.text;
    let txt = `<b>4-Savol</b>\n\nNutqingiz qanday ?`;
    await ctx.replyWithHTML(txt);
    return ctx.wizard.next();
},

async ctx => {
    if(!ctx.message) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
    ctx.wizard.state.user.quiz4 = ctx.message.text;
    let txt = `<b>5-Savol</b>\n\nKunlik ishlash vaqt soatingiz ?`;
    await ctx.replyWithHTML(txt);
    return ctx.wizard.next();
},

async ctx => {
    if(!ctx.message) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
    ctx.wizard.state.user.quiz5 = ctx.message.text;
    let txt = `<b>6-Savol</b>\n\nO'zingizning 3 ta eng kuchli jixatlaringiz ?`;
    await ctx.replyWithHTML(txt);
    return ctx.wizard.next();
},

async ctx => {
if(!ctx.message) return;
if(ctx.message.text == "/start") return ctx.scene.reenter();
    ctx.wizard.state.user.quiz6 = ctx.message.text;
    let txt = `<b>7-Savol</b>\n\nKutayotgan daromadingiz ?`;
    await ctx.replyWithHTML(txt);
    return ctx.wizard.next();
},

async ctx => {
    if(!ctx.message) return;
    if(ctx.message.text == "/start") return ctx.scene.reenter();
    ctx.wizard.state.user.quiz7 = ctx.message.text;
    const {
        id, 
        username, 
        first_name, 
        phone, 
        quiz1,
        quiz2,
        quiz3,
        quiz4,
        quiz5,
        quiz6,
        quiz7,
    } = ctx.wizard.state.user;
    let txt = `<b>Malumotlaringiz hammasi to'g'rimi ?</b>\n
🆔 User_id: <b>${id}</b>
👤 Ishchi: <b>${first_name}</b>
👤 Username: <b>${username ? "@"+username:"Aniqlanmagan"}</b>
📞 Telefon: <b>${phone}</b>
👩‍💻 Tajriba: <b>${quiz1}</b>
👨‍🏫 O'quv kurs: <b>${quiz2}</b>
👤 Mijozlar e'tirozi: <b>${quiz3}</b>
🧏‍♀️ Nutqi: <b>${quiz4}</b>
⌚Kunlik vaqti: <b>${quiz5}</b>
🏋️ Kuchli jixatlari: <b>${quiz6}</b>
💰 Kutgan daromadi: <b>${quiz7}</b>
`;


    ctx.replyWithHTML(txt, {
        ...Markup.inlineKeyboard([
            Markup.button.callback("Ha","yes"),
            Markup.button.callback("Yoq","no")
        ],{columns:2})
    });

    return ctx.wizard.next();
},


async ctx => {
    if(!ctx.callbackQuery) return;
    if(ctx.callbackQuery.data == "yes") {
        const {
            id, 
            username, 
            first_name, 
            phone, 
            quiz1,
            quiz2,
            quiz3,
            quiz4,
            quiz5,
            quiz6,
            quiz7,
        } = ctx.wizard.state.user;

        const user = await Users.findOne({user_id:id});
        if(!user) {
            await new Users({
                user_id:id,
                username:"@"+username,
                first_name,
                phone
             }).save();
     
        } 
        

        txt = `Sizni so'rovingiz qabul qilindi. Bergan javoblaringizga qarab uch ish kunida siz bilan bo'g'lanishadi Agar bo'g'lanilmasa  demak siz qabul qilinmagansiz. E'tiboringiz uchun rahmat ✅`;
        
        await ctx.replyWithHTML(txt);
        
        txt = `
    📝 <b>ANKETA</b>
    
    🆔 User_id: <b>${id}</b>
    👤 Ishchi: <b>${first_name}</b>
    👤 Username: <b>${username ? "@"+username:"Aniqlanmagan"}</b>
    📞 Telefon: <b>${phone}</b>
    👩‍💻 Tajriba: <b>${quiz1}</b>
    👨‍🏫 O'quv kurs: <b>${quiz2}</b>
    👤 Mijozlar e'tirozi: <b>${quiz3}</b>
    🧏‍♀️ Nutqi: <b>${quiz4}</b>
    ⌚Kunlik vaqti: <b>${quiz5}</b>
    🏋️ Kuchli jixatlari: <b>${quiz6}</b>
    💰 Kutgan daromadi: <b>${quiz7}</b>
    `;
    const admins = await Users.find({isAdmin:true});
  
     admins.forEach(async admin => {
        await ctx.telegram.sendMessage(admin.user_id,txt, {
            parse_mode:"HTML"
           });

           return ctx.scene.leave();
       });
    
    } else {
        let txt = `<b>Anteka Boshidan To'ldiring 🔽</b>`;
        await ctx.replyWithHTML(txt);
        await ctx.scene.reenter();
    }
}


);





module.exports = start;