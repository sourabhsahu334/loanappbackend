const nodeMailaer= require("nodemailer")

const sendEmail=async (options)=>{
    const transporter = nodeMailaer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:"gmail",
        auth:{
            user:"sourabhsahu339@gmail.com",
            pass:"ohbbrqvbenqraiki"
        }
    })
    const mailOptions = {
        from: "sourabhsahu339@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
      };
    
      await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;