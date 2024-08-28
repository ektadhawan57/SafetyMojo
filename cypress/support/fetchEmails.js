const axios = require('axios');
const qs = require('qs');

const tenantId = 'cf3e6b34-7320-4767-88a0-dc9e2c4b4f5d';
const clientId = '1d302f73-334d-4250-aaf6-f321b14fd6ef';
const clientSecret = 'c694f8cf-1c3b-43f5-8cea-e15c611ce397';
const userEmail = 'ekta.dhawan@getmojo.ai';

async function getAccessToken() {
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const tokenData = {
    client_id: clientId,
    scope: 'https://graph.microsoft.com/.default',
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  };

  try {
    const response = await axios.post(tokenUrl, qs.stringify(tokenData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    throw error;
  }
}

async function fetchEmails() {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(`https://graph.microsoft.com/v1.0/users/${userEmail}/messages`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        
      },
      timeout: 30000, 
    });

    const emails = response.data.value;
    if (emails.length > 0) {
      const verificationEmail = emails.find(email => email.subject.includes('Mojo AI OTP'));
      if (verificationEmail) {
        const codeMatch = verificationEmail.body.content.match(/\b\d{6}\b/); // Assuming the code is 6 digits
        if (codeMatch) {
          return codeMatch[0];
        }
        console.log("CodeMatch"+codeMatch);
      }
    }

    throw new Error('Verification code not found in email.');
  } catch (error) {
    console.error('Error fetching emails:', error.message);
    throw error;
  }
}

module.exports = { fetchEmails };
