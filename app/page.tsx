'use client'; // This directive allows the use of client-side features

import { useState } from 'react';

export default function HomePage() {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    organization_name: '',
    domain: '',
    linkedin_url: '',
    reveal_personal_emails: true,
    reveal_phone_number: true,
    webhook_url: ''
  });
  const [responseData, setResponseData] = useState(null);

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/getPhoneNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setResponseData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Get Person Data</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
        <input type="text" name="organization_name" placeholder="Organization Name" onChange={handleChange} />
        <input type="text" name="domain" placeholder="Domain" onChange={handleChange} />
        <input type="text" name="linkedin_url" placeholder="LinkedIn URL" onChange={handleChange} />
        <input type="text" name="webhook_url" placeholder="Webhook URL" onChange={handleChange} />
        <button type="submit">Get Data</button>
      </form>
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
