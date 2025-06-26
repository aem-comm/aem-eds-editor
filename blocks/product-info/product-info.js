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

    try {
        const response = await fetch(
        'https://27420-auspost-integratiton.adobeioruntime.net/api/v1/web/shipping/fetch-shipping-prices',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }), // ✅ trailing comma
        }, // ✅ optional but often required if ESLint enforces trailing commas
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
