export default function decorate(block) {
  block.innerHTML = `
    <form class="product-info">
      <label>First Name
        <input type="text" name="firstname" required />
      </label>
      <label>Last Name
        <input type="text" name="lastname" required />
      </label>
      <label>Email Address
        <input type="email" name="email" required />
      </label>
      <label>Password
        <input type="password" name="password" required />
      </label>
      <button type="submit">Create Customer</button>
    </form>
  `;

  const token = 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI'
  + '6ImF0In0.eyJpZCI6IjE3NTE0NTQ4NDQ3MDJfZTYyNzhiNTUtY2IzYy00NGJjLTg2ZGItMGQzNTkxNjI3NWQxX3V3MiIsIm9yZyI6IjIyRkFERT'
  + 'AwNTcyMUY4MjU3RjAwMDEwMUBBZG9iZU9yZyIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiI3NzE4NWExZTdkZDE0M2NiYWE0'
  + 'Mzc2ODM3MTc4MGM4MiIsInVzZXJfaWQiOiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbm'
  + 'ExIiwiYWFfaWQiOiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJtb2kiOiJiOTAzYjM0MCIs'
  + 'ImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiYWRvYmVpb19hcGksb3BlbmlkLHJlYWRfY2xpZW50X3NlY3JldCxBZG9iZUlELGFkZG'
  + 'l0aW9uYWxfaW5mby5yb2xlcyxtYW5hZ2VfY2xpZW50X3NlY3JldHMscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0'
  + 'ZWRQcm9kdWN0Q29udGV4dCxldmVudF9yZWNlaXZlcl9hcGkiLCJjcmVhdGVkX2F0IjoiMTc1MTQ1NDg0NDcwMiJ9.IIxeBuFS_QILkqLb7iYVH'
  + 'Sxz0x56ytqEOEqPPnW66dyJ9pwlsGGACbDOtjd0l1VYRCCTi8P29LGbFH6AYu-SC7cslmFpYArDv3Smg3MmCF3R3nKF_XiitSwzeQSetM_Nlc9'
  + '11YBNrsGrkoPY549WDFYBatPOlUSHajryiLiBZYuhvyOM_h5kQYzHyhGTDs9HNKkHt6eoUzxi2HzzaDpu46NyMaevwLBnBjMX_VOvHjXnIuYfq'
  + 'rDRGpYrHopCgJm4bxz8Gi_RtNFwukTOLB5iSun6VsaPLXGK6IdAGW0nLox_mQuuhMDHv2fHrCpZeYJ-6luhNMpwV_wN3lONUB2Nxg';

  const form = block.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const email = form.email.value;
    const password = form.password.value;

    const query = `
      mutation {
        createCustomerV2(
          input: {
            firstname: "${firstname}"
            lastname: "${lastname}"
            email: "${email}"
            password: "${password}"
          }
        ) {
          customer {
            firstname
            lastname
            email
            is_subscribed
          }
        }
      }
    `;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'x-gw-ims-org-id': '22FADE005721F8257F000101@AdobeOrg',
      },
      body: JSON.stringify({ query }),
    };

    try {
      const response = await fetch(
        'https://27420-auspost-integratiton.adobeioruntime.net/api/v1/web/shipping/fetch-shipping-prices',
        options,
      );

      const result = await response.json();

      if (result?.data?.createCustomerV2?.customer) {
        alert('Customer created successfully!');
        form.reset();
      } else {
        alert('Failed to create customer. Check console for details.');
        console.error(result);
      }
    } catch (error) {
      console.error('API call failed:', error);
      alert('Network error. Please try again.');
    }
  });
}
