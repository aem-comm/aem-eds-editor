export default function decorate(block) {
  // Create Button
  const button = document.createElement('button');
  button.textContent = 'AEM to App Builder';
  button.style.padding = '1em';
  button.style.marginBottom = '1em';
  block.appendChild(button);

  // Create Output Display
  const resultDisplay = document.createElement('pre');
  resultDisplay.style.backgroundColor = '#f5f5f5';
  resultDisplay.style.padding = '1em';
  resultDisplay.style.whiteSpace = 'pre-wrap';
  block.appendChild(resultDisplay);

  // Button click handler
  button.addEventListener('click', async () => {
    const endpoint = 'https://27420-auspost-integratiton.adobeioruntime.net/api/v1/web/shipping/fetch-shipping-prices';

    const token = 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI'
    + '6ImF0In0.eyJpZCI6IjE3NTEzNzk1NTI3NDVfYzEwNWFkYzktYWM4MC00NzkyLWIzMGUtNzllNzYwNzNhYzJmX3V3MiIsIm9yZyI6IjIyRkFERTA'
    + 'wNTcyMUY4MjU3RjAwMDEwMUBBZG9iZU9yZyIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiI3NzE4NWExZTdkZDE0M2NiYWE0Mzc2'
    + 'ODM3MTc4MGM4MiIsInVzZXJfaWQiOiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwi'
    + 'YWFfaWQiOiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJtb2kiOiI1MjVkMWY2ZSIsImV4cGly'
    + 'ZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiYWRvYmVpb19hcGksb3BlbmlkLHJlYWRfY2xpZW50X3NlY3JldCxBZG9iZUlELGFkZGl0aW9uYWxfa'
    + 'W5mby5yb2xlcyxtYW5hZ2VfY2xpZW50X3NlY3JldHMscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q'
    + '29udGV4dCxldmVudF9yZWNlaXZlcl9hcGkiLCJjcmVhdGVkX2F0IjoiMTc1MTM3OTU1Mjc0NSJ9.AgDst1DARI7YoiXF7MMzqa4ztHGNIPhNszJC'
    + 'mBGjZfN-XLdm72CezK1kj-RlOJM4B6-FNfKUSsLSf71gPyja3iwii_eGrU7Yg1TVporrM1TwNNiYiFjednBkXoPHNnkW8IMnT_j_39lcqpyQImF'
    + 'pJpsGLlXSPJW9wvzUXAEA2ZYxvUmpZakpnOKtcF_wDSEjl4eXSXYZu0t6TUyiW8IV130JgTirzQdIaGEjE_ajc_FmMfwgnVJuioR0Ej58mX5Emle'
    + 'wWPSekvSZHd-7ijlwYcTObLiGofxrdI-OkiHDfa_xVaW7A_GTa0OgExxTBhLRLE7zLGLC2JY5KqjEKL3hCw';

    const query = {
      title: 'I am Hero',
      userId: 5,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-gw-ims-org-id': '22FADE005721F8257F000101@AdobeOrg',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.errors) {
        resultDisplay.textContent = `❌ Error:\n${JSON.stringify(data.errors, null, 2)}`;
      } else {
        resultDisplay.textContent = `✅ Customer Created:\n${JSON.stringify(data.data, null, 2)}`;
      }
    } catch (error) {
      resultDisplay.textContent = `⚠️ Network Error: ${error.message}`;
    }
  });
}
