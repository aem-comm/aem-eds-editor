export default function decorate(block) {
  // Create Button
  const button = document.createElement('button');
  button.textContent = 'AEM to App builder';
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
     + '6ImF0In0.eyJpZCI6IjE3NDkxMjYyNTgwMDdfNzY5YjQ4OTUtODhkMS00Y2FkLTg3OGUtMGFkYzdlMGNmZjliX3V3MiIsIm9yZyI6IjIyRkFERTAw'
     + 'NTcyMUY4MjU3RjAwMDEwMUBBZG9iZU9yZyIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiI3NzE4NWExZTdkZDE0M2NiYWE0Mzc2'
     + 'ODM3MTc4MGM4MiIsInVzZXJfaWQiOiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYW'
     + 'FfaWQiOiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJtb2kiOiJjZDA4MDQ1IiwiZXhwaXJlc19p'
     + 'biI6Ijg2NDAwMDAwIiwic2NvcGUiOiJhZG9iZWlvX2FwaSxvcGVuaWQscmVhZF9jbGllbnRfc2VjcmV0LEFkb2JlSUQsYWRkaXRpb25hbF9pbmZvLnJ'
     + 'vbGVzLG1hbmFnZV9jbGllbnRfc2VjcmV0cyxyZWFkX29yZ2FuaXphdGlvbnMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0L'
     + 'GV2ZW50X3JlY2VpdmVyX2FwaSIsImNyZWF0ZWRfYXQiOiIxNzQ5MTI2MjU4MDA3In0.RuwJ_vZYLmBBVbgTphnB4yVPsiBoA7_Oj_H21HKsGYzDs17'
     + 'O-DRtTwflmT3EZPHwMlcLIx8J0jWi1i2sIg0H-e179Kdc3Xiy8k_mFjpcXR9i8SEWGeGMdXUB0obGC_fSBpmfx3jQ1wMDTtKzOA27p2PURM4lSxOvx'
     + 'Y9hhRmCCBqmR_9wkzGTtDoSgqxIlc_cKjueP-JOUcBNvVcFWzvWRMXPF6x5gnvfWWczaezbAF_tc6YWEoy3QblLbQzKN9S4r_19zS5Icu-4FWJDn0F'
     + 'g9Ofi7KW2FfJXnklClSH71Dqig8ScoHYxkzFkP_9XUW01v6Z47KuwTTBdA7I8RiNR1g';

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
