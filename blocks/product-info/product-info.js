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

  const token = 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3NTEzNzg1MDI0OTJfYzkwYjQ0MmEtNWY0YS00N2I4LTliZGEtOTg0YjViZDU1NDBlX3V3MiIsIm9yZyI6IjIyRkFERTAwNTcyMUY4MjU3RjAwMDEwMUBBZG9iZU9yZyIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiI3NzE4NWExZTdkZDE0M2NiYWE0Mzc2ODM3MTc4MGM4MiIsInVzZXJfaWQiOiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJtb2kiOiIyYTY5NGVmZSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsImNyZWF0ZWRfYXQiOiIxNzUxMzc4NTAyNDkyIiwic2NvcGUiOiJhZG9iZWlvX2FwaSxvcGVuaWQscmVhZF9jbGllbnRfc2VjcmV0LEFkb2JlSUQsYWRkaXRpb25hbF9pbmZvLnJvbGVzLG1hbmFnZV9jbGllbnRfc2VjcmV0cyxyZWFkX29yZ2FuaXphdGlvbnMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0LGV2ZW50X3JlY2VpdmVyX2FwaSJ9.c4kIEUHAu2ZM38YejRnroTaWT_hdO5iEmhi26STlkQWFjEE2iIXJLurKfXpp6OJnn5q6HTVhuV_gra0R9FOiuJCf1JxE7FnRVwLa2uXqY90rvU3gWqYxDO1ZE9e-0RNHGpZ7B1jzzPixUszPbB6V1_Ejr5qINgDpsxnjIdU2XQIk-IJPO-ydQbDnCzZZwRTl0jDOPhlyAWSpTPe6XjzuCFjV3pTiDxSaNw3oMmrEGYYQfQ5QtYleRiMW-DSZj_BCF_91JWanRp140eZmJfgcZtopjvtaj2RVt_mZW-9-7cpr4bnhS7CFLy9EqsXX7l4s2-TrUQoFI5j5mJOHfqMhCA';

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
