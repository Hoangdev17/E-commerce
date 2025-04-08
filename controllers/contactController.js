import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";

export const sendContactEmail = async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      // Lưu vào database
      const newContact = await Contact.create({ name, email, message });
  
      // Nội dung email gửi cho Admin
      const adminEmailContent = `
        <h3>Liên hệ mới từ khách hàng</h3>
        <p><strong>Họ tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nội dung:</strong> ${message}</p>
        <br />
        <p>Vui lòng phản hồi sớm!</p>
      `;
  
      // Nội dung email phản hồi cho khách hàng
      const userEmailContent = `
        <h3>Xin chào ${name},</h3>
        <p>Chúng tôi đã nhận được yêu cầu liên hệ của bạn:</p>
        <blockquote>"${message}"</blockquote>
        <p>Chúng tôi sẽ phản hồi trong thời gian sớm nhất. Cảm ơn bạn đã liên hệ!</p>
        <br />
        <p>Trân trọng,<br />E-Shop Team</p>
      `;
  
      // Gửi email đến Admin
      await sendEmail("hoangluudev17@gmail.com", "Liên hệ mới từ khách hàng", adminEmailContent);
  
      // Gửi email xác nhận cho khách hàng
      await sendEmail(email, "Xác nhận yêu cầu liên hệ - E-Shop", userEmailContent);
  
      return res.status(201).json({ message: "Emails sent successfully!", success: true });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };

export const getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
};
