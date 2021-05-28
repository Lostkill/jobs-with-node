import Mail from "../lib/Mail-lib";

export default {
  key: "MailRegister",
  async handle({ data }) {
    const { user } = data;
    await Mail.sendMail({
      from: "Pablo Fernandes <pablo.fernandes@veoow.com.br>",
      to: `${user.name} <${user.email}>`,
      subject: "Cadastro de usuario...",
      html: `Olá ${user.name}, bem-vindo ao sistema :D`,
    });
  },
};
