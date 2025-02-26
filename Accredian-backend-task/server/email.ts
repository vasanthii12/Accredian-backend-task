import { type Referral } from "@shared/schema";
import nodemailer from "nodemailer";

// Initialize email transport with proper verification
const initializeEmailTransport = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log("Email configuration missing. Email notifications will be disabled.");
    return null;
  }

  console.log("Attempting to configure email transport with user:", process.env.EMAIL_USER);

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    debug: true // Enable debug logging
  });

  // Verify transport configuration
  transport.verify((error) => {
    if (error) {
      console.error("Email configuration error:", error);
    } else {
      console.log("Email server is ready to send messages");
    }
  });

  return transport;
};

const transport = initializeEmailTransport();

export async function sendReferralEmail(referral: Referral) {
  if (!transport) {
    console.log("Email transport not configured. Skipping email notification.");
    return;
  }

  try {
    console.log(`Attempting to send email to ${referral.refereeEmail}`);

    await transport.sendMail({
      from: {
        name: "Accredian Learning",
        address: process.env.EMAIL_USER!
      },
      to: referral.refereeEmail,
      subject: `${referral.referrerName} invited you to join ${referral.courseName}!`,
      text: `${referral.referrerName} has referred you to take the ${referral.courseName} course. Join now to start learning and earn rewards!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello ${referral.refereeName}!</h2>
          <p>Great news! <strong>${referral.referrerName}</strong> has referred you to take the <strong>${referral.courseName}</strong> course.</p>
          <p>By joining through this referral program, you can earn up to ₹11,000 as a referee bonus!</p>
          <p>Ready to start learning? Click below to get started:</p>
          <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px;">
            Enroll Now
          </a>
        </div>
      `
    });

    console.log(`Email sent successfully to ${referral.refereeEmail}`);
  } catch (error) {
    console.error("Failed to send referral email:", error);
    // Don't throw the error - we don't want email failures to break the referral process
  }
}