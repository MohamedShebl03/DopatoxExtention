import { resendCode } from './auth.js';

document.addEventListener('DOMContentLoaded', function () {
  const resendCodeDiv = document.querySelector('.resendcode-box');
  if (resendCodeDiv) {
    const resendForm = resendCodeDiv.querySelector('.resendcode-form');
    if (resendForm) {
      resendForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const user = {
          email: resendForm.email.value.trim()
        };
        try {
          const data = await resendCode(user);
          console.log('Resend code response:', data);
          if (data && data.isSuccess) {
            alert("Verify Code Send! Please check your email for the verification code.");
            localStorage.setItem("lastClickedLink", "verifycode");
            location.href = 'popup.html';
          } else {
            const message = data.faildMessage || "Signup failed: Invalid response from server.";
            alert(message);
          }
        } catch (error) {
          console.error('Error sending resend code request:', error);
        }
      });
    }
  }
});
