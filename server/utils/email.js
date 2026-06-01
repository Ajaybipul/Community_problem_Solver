import nodemailer from "nodemailer";

const hasEmailConfig = () => {
    return Boolean(
        process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS &&
        process.env.FROM_EMAIL
    );
};

const buildTransporter = () => {
    if (!hasEmailConfig()) {
        return null;
    }
    console.log(hasEmailConfig(),"hasEmailConfig")
console.log({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  user: process.env.SMTP_USER,
  from: process.env.FROM_EMAIL
});
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

export const sendEmailIfConfigured = async ({ to, subject, text }) => {
    console.log(to, subject, text,"sendEmailIfConfigured")
    const transporter = buildTransporter();
    console.log(transporter,"transporter")
    if (!transporter || !to) {
        return { sent: false };
    }

    // try {
    //     await transporter.sendMail({
    //         from: process.env.FROM_EMAIL,
    //         to,
    //         subject,
    //         text
    //     });

    //     return { sent: true };
    // } catch (error) {
    //     console.error("Email send failed:", error.message);
    //     return { sent: false };
    // }
  try {
    console.log("Starting sendMail...");

    const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        text
    });

    console.log("Email sent:", info.messageId);

    return { sent: true };
} catch (error) {
    console.error("Full email error:", error);
    console.error("Error code:", error.code);
    return { sent: false };
}
};