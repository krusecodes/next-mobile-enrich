import { NextResponse } from 'next/server';

export async function POST(request) {
  const { first_name, last_name, organization_name, domain, linkedin_url, webhook_url } = await request.json();

  try {
    const response = await fetch('https://api.apollo.io/v1/people/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': 'YOURAPIKEY', // Replace with your actual API key
      },
      body: JSON.stringify({
        first_name,
        last_name,
        organization_name,
        domain,
        linkedin_url,
        reveal_personal_emails: true,
        reveal_phone_number: true,
        webhook_url,
      }),
    });

    const data = await response.json();
    console.log('Response Data:', data); // Log the full response data for debugging

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
