export const verifyEmailTemplate = (userToken) => {
  return `
    <div style="background-color: #f2f2f2; padding: 20px;">
      <h1 style="color: #004d99; text-align: center;">Welcome to ShareView feedback App!</h1>
      <p style="color: #000; font-size: 16px;">Please click below to activate your account:</p>
      <a href="${process.env.FRONTEND_URL}/auth/verify-email/${userToken}" style="display: block; text-align: center; padding: 10px 20px; background-color: #004d99; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Verify Your Email</a>
      <p style="color: #000; font-size: 14px;">Thank you for choosing ShareView feedback App.</p>
    </div>
    `;
};
