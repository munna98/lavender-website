import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, vehicle, year, message } = req.body;

  try {
    // Gmail SMTP transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // your Gmail
        pass: process.env.GMAIL_PASS, // app password (not your real password!)
      },
    });

    // Email content
    await transporter.sendMail({
      from: `"Auto Parts Inquiry" <${process.env.GMAIL_USER}>`,
      to: "lavenderautospareparts@gmail.com",
      subject: "New Auto Parts Request",
      text: `
        Name: ${name}
        Email: ${email}
        Vehicle: ${vehicle}
        Year: ${year}
        Message: ${message}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
