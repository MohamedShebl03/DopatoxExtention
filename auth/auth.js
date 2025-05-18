const API_BASE_URL = "https://api.dopatox.site/api/Auth";

async function signUp(user) {
  const response = await fetch(`${API_BASE_URL}/SignUp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    } else {
      const errorText = await response.text();
      throw new Error(errorText || "Signup failed");
    }
  }

  return response.json();
}

async function signIn({ email,password }) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email,password }),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    } else {
      const errorText = await response.text();
      throw new Error(errorText || "Login failed");
    }
  }

  return response.json();
}

async function verifyCode({ email, code }) {
  const response = await fetch(`${API_BASE_URL}/VerifyCode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Verification failed");
  }

  return response.json();
}

async function resendCode({email}) {
  const response = await fetch(`${API_BASE_URL}/ResendCode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Resend code failed");
    } else {
      const errorText = await response.text();
      throw new Error(errorText || "Resend code failed");
    }
  }

  return response.json();
}

export { signUp, signIn, verifyCode, resendCode };
