var nodemailer=require("nodemailer");
var transport = nodemailer.createTransport({
    service:'qq',
    port:465,
    secureConnection:true,
    auth:{
        user:"cs.zyhu@qq.com",
        pass:"xfjeqcgslmbvbgac"
    }
});

function sendMail(mailOptions){
    transport.sendMail(mailOptions,function(err,info){
        if(err){
            return console.log(err);
        }else{
            console.log("Message Sent: "+info);
        }
    })
}

module.exports = sendMail;
