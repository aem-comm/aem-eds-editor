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

  const token = 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.'
  + 'eyJpZCI6IjE3NTA5MjI2MzQ5OTVfMTQxMjExMWQtNTI5Zi00YzY0LWFjM2YtN2E5YjI2YTM2ZmQ4X3V3MiIsIm9yZyI6IjIyRkFERTAwNTcyMUY4'
  + 'MjU3RjAwMDEwMUBBZG9iZU9yZyIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiI3NzE4NWExZTdkZDE0M2NiYWE0Mzc2ODM3MTc4'
  + 'MGM4MiIsInVzZXJfaWQiOiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQi'
  + 'OiI5OTNCMjI3RTY4MkIyQkVDMEE0OTVDMjdAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJtb2kiOiI5MTc2ZTcwYSIsImV4cGlyZXNfaW4i'
  + 'OiI4NjQwMDAwMCIsInNjb3BlIjoiYWRvYmVpb19hcGksb3BlbmlkLHJlYWRfY2xpZW50X3NlY3JldCxBZG9iZUlELGFkZGl0aW9uYWxfaW5mby5y'
  + 'b2xlcyxtYW5hZ2VfY2xpZW50X3NlY3JldHMscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4'
  + 'dCxldmVudF9yZWNlaXZlcl9hcGkiLCJjcmVhdGVkX2F0IjoiMTc1MDkyMjYzNDk5NSJ9.'
  + 'gTpNVWW7K_SzyVe1O4ROBq_lYw7upethRWJ4JrJ3nOvm68gN55XdDPc09r3K7e3BQJkwaB6M_2Th3gNX-FGUlBn58O8EKeSPWxYOdxuGedOZlEhXv'
  + 'svknZMVKDgGXxiH-oHMO6bqyuUS-l1y2i022fclXFxm1HqfbQ4SkwP1ct_MDbkjtCzS7TQsSTS2VA9YhfFUKTQ0NyTCQA9MiIdWB9jxB6U6s3ZCYk'
  + 'aw6EuHV_YzKtuj5iYWdXg52U1K0xn75ZO1sb3GB3zjtXI7cPVv4cwn_yw-PkASnf4T7YSqrwnAIoX0Pzf6MQOdcok7XIUhxVhU0T7iVQVPIqxNv73ufg';

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
        body: JSON.stringify({ query }),
      }
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
