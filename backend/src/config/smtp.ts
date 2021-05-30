module.exports = {
  host: "smtp.gmail.com",
  port: 587,
  user: process.env.MAILER_EMAIL,
  pass: process.env.MAILER_PASSWORD,
};