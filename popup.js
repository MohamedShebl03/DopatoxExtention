document.addEventListener('DOMContentLoaded', function () {
  const signInLink = document.getElementById('signInLink');
  const signUpLink = document.getElementById('signUpLink');
  const signUpLink2 = document.getElementById('signUpLink2');
  const signInLink2 = document.getElementById('signInLink2');
  const resendCodeLink = document.getElementById('resendCodeLink');
  const signInDiv = document.querySelector('.signin-box');
  const signUpDiv = document.querySelector('.signup-box');
  const startUpDiv = document.querySelector('.startup');
  const verifyCodeDiv = document.querySelector('.verification-box');
  const resendCodeDiv = document.querySelector('.resendcode-box');
  const mainPageDiv = document.querySelector('.main-page');

  // Restore last clicked link state and set div visibility
  const lastClicked = localStorage.getItem('lastClickedLink');
  
  if(!lastClicked){
    localStorage.setItem('lastClickedLink', 'startup');
  }
  if (lastClicked === 'signIn') {
    signInDiv.style.display = 'block';
    signUpDiv.style.display = 'none';
    startUpDiv.style.display = 'none';
    verifyCodeDiv.style.display = 'none';
    mainPageDiv.style.display = 'none';
    resendCodeDiv.style.display = 'none';
  } else if (lastClicked === 'signUp') {
    signInDiv.style.display = 'none';
    signUpDiv.style.display = 'block';
    startUpDiv.style.display = 'none';
    verifyCodeDiv.style.display = 'none';
    mainPageDiv.style.display = 'none';
    resendCodeDiv.style.display = 'none';
  } else if (lastClicked === 'startup') {
    signInDiv.style.display = 'none';
    signUpDiv.style.display = 'none';
    startUpDiv.style.display = 'block';
    verifyCodeDiv.style.display = 'none';
    mainPageDiv.style.display = 'none';
    resendCodeDiv.style.display = 'none';
  }else if (lastClicked === 'verifycode') {
    signInDiv.style.display = 'none';
    signUpDiv.style.display = 'none';
    startUpDiv.style.display = 'none';
    verifyCodeDiv.style.display = 'block';
    mainPageDiv.style.display = 'none';
    resendCodeDiv.style.display = 'none';
  }else if (lastClicked === 'mainPage') {
    signInDiv.style.display = 'none';
    signUpDiv.style.display = 'none';
    startUpDiv.style.display = 'none';
    verifyCodeDiv.style.display = 'none';
    mainPageDiv.style.display = 'block';
    resendCodeDiv.style.display = 'none';
  }else if (lastClicked === 'resendCode') {
    signInDiv.style.display = 'none';
    signUpDiv.style.display = 'none';
    startUpDiv.style.display = 'none';
    verifyCodeDiv.style.display = 'none';
    mainPageDiv.style.display = 'none';
    resendCodeDiv.style.display = 'block';
  }

  // Add userName from localStorage to welcome message if available
  const userName = localStorage.getItem('userName');
  
  if (userName && mainPageDiv) {
    const welcomeHeading = mainPageDiv.querySelector('h1');
    if (welcomeHeading) {
      welcomeHeading.textContent = `Welcome ${userName}.!`;
    }
  }

  // Save clicked link state and update div visibility
  signInLink.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.setItem('lastClickedLink', 'signIn');
    signInDiv.style.display = 'block';
    signUpDiv.style.display = 'none';
    startUpDiv.style.display = 'none';
    verifyCodeDiv.style.display = 'none';
    resendCodeDiv.style.display = 'none';
    mainPageDiv.style.display = 'none';
  });

  signUpLink.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.setItem('lastClickedLink', 'signUp');
    signInDiv.style.display = 'none';
    signUpDiv.style.display = 'block';
    startUpDiv.style.display = 'none';
    verifyCodeDiv.style.display = 'none';
    resendCodeDiv.style.display = 'none';
    mainPageDiv.style.display = 'none';
  });

  // Additional sign up link inside sign-in form
  if (signUpLink2) {
    signUpLink2.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.setItem('lastClickedLink', 'signUp');
      signInDiv.style.display = 'none';
      signUpDiv.style.display = 'block';
      startUpDiv.style.display = 'none';
      verifyCodeDiv.style.display = 'none';
      resendCodeDiv.style.display = 'none';
      mainPageDiv.style.display = 'none';
    });
  }

  // Additional sign in link inside sign-up form
  if (signInLink2) {
    signInLink2.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.setItem('lastClickedLink', 'signIn');
      signInDiv.style.display = 'block';
      signUpDiv.style.display = 'none';
      startUpDiv.style.display = 'none';
      verifyCodeDiv.style.display = 'none';
      resendCodeDiv.style.display = 'none';
      mainPageDiv.style.display = 'none';
    });
  }
  if (resendCodeLink) {
    resendCodeLink.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.setItem('lastClickedLink', 'resendCode');
      signInDiv.style.display = 'none';
      signUpDiv.style.display = 'none';
      startUpDiv.style.display = 'none';
      verifyCodeDiv.style.display = 'none';
      resendCodeDiv.style.display = 'block';
      mainPageDiv.style.display = 'none';
    });
  }

  // Add event listener for the blocked websites form submission
  if (mainPageDiv) {
    const blockWebsiteForm = mainPageDiv.querySelector('form.d-flex');
    if (blockWebsiteForm) {
      blockWebsiteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const websiteInput = blockWebsiteForm.querySelector('input[name="websiteUrl"]');
        if (websiteInput) {
          const inputUrl = websiteInput.value.trim();
          if (inputUrl) {
            let domain = inputUrl;
            try {
              // Try to parse the URL and extract the hostname (domain)
              const urlObj = new URL(inputUrl);
              domain = urlObj.hostname;
            } catch (e) {
              // If invalid URL, fallback to input as is (could be domain only)
              domain = inputUrl;
            }
            // Get existing blocked websites from localStorage or initialize empty array
            let blockedWebsites = JSON.parse(localStorage.getItem('blockedWebsites') || '[]');
            console.log(` already Existed Blocked domain added: ${domain}`);
            console.log('Current blocked domains:', blockedWebsites);
            // Add new domain if not already in the list
            if (!blockedWebsites.includes(domain)) {
              blockedWebsites.push(domain);
              localStorage.setItem('blockedWebsites', JSON.stringify(blockedWebsites));
              console.log(`New Blocked domain added: ${domain}`);
              console.log('Current blocked domains:', blockedWebsites);
            }
            // Clear the input field after adding
            websiteInput.value = '';
          }
        }
      });
    }
  }

});
