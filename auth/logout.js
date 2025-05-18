document.addEventListener('DOMContentLoaded', function () {
  const logoutLink = document.getElementById('logoutLink');

  if (logoutLink) {
    logoutLink.addEventListener('click', async function (event) {
      event.preventDefault();
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // Send logout request to backend API
          const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refToken: refreshToken }),
          });
          if (!response.ok) {
            console.error('Logout request failed:', response.statusText);
          }
        } catch (error) {
          console.error('Logout request error:', error);
        }
      }
      // Clear all relevant local storage items on logout
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('lastClickedLink');
      // Redirect to startup page
      localStorage.setItem('lastClickedLink', 'startup');
      location.href = 'popup.html';

    });
  }
});
