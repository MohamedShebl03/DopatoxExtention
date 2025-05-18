import { verifyCode } from "./auth.js";

document.querySelector('.verifycode-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const user = {
    email: form.email.value.trim(),
    code: form.verificationCode.value
  };
  if (!user.email || !user.code) {
    alert("Please fill in all required fields.");
    return;
  }
  try {
    const result = await verifyCode(user);
    console.log("Verification successful:", result);
    // Receive tokens and userName from response
    const { token, refreshToken, userName } = result;
    console.log("Access Token:", token);
    console.log("Refresh Token:", refreshToken);
    console.log("User Name:", userName);
    // Store tokens and userName in local storage if found
    if (token) {
      localStorage.setItem("accessToken", token);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    if (userName) {
      localStorage.setItem("userName", userName);
    }
    localStorage.setItem("lastClickedLink", "mainPage");
    location.href = 'popup.html';
  } catch (error) {
    console.error("Verification failed:", error.message);
    // Handle verification failure (e.g., show error message)
  }
});


