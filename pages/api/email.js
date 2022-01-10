import nodemailer from "nodemailer";
export default function handler(req, res) {
  const transporter = nodemailer.createTransport({
    service: "SendinBlue",
    auth: {
      user: "klucidor@gmail.com",
      pass: "yBXZ4Eabv2mGqkfR",
    },
  });

  const dayMilliSeconds = 24 * 3600 * 1000;
  const mailData = {
    from: "klucidor@gmail.com",
    to: req.body.email,
    subject: "Time to clean!",
    text:
      "Hi " +
      req.body.name +
      "! It's your turn to clean the kollektiv! Your assigned week begins on " +
      new Date(req.body.date - 6 * dayMilliSeconds).toLocaleDateString(
        "en-GB",
        {
          weekday: "long",
          day: "2-digit",
          month: "short",
        }
      ) +
      " and ends on " +
      new Date(task.date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "short",
      }) +
      ".",
  };

  transporter
    .sendMail(mailData)
    .then((info) => {
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((err) => res.status(400).json({ message: "Failed to send email" }));
}
