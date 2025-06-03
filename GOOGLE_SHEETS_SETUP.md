# Google Sheets Integration Setup Guide

This guide will walk you through setting up Google Sheets integration for the Children of Christ nonprofit website.

## Prerequisites

- Google account with access to Google Cloud Console
- Google Sheets spreadsheet created
- Next.js application with the provided integration code

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" and then "New Project"
3. Name your project (e.g., "children-of-christ-forms")
4. Click "Create"

## Step 2: Enable Google Sheets API

1. In the Google Cloud Console, navigate to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

## Step 3: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Enter a name (e.g., "sheets-integration")
4. Click "Create and Continue"
5. For roles, add "Editor" role
6. Click "Continue" and then "Done"

## Step 4: Generate Service Account Key

1. In the Credentials page, click on your service account email
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Select "JSON" format
5. Click "Create" - this will download a JSON file

## Step 5: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Children of Christ - Form Submissions"
4. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

## Step 6: Share Spreadsheet with Service Account

1. In your Google Sheet, click "Share"
2. Add the service account email: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com
3. Give it "Editor" permissions
4. Click "Send"

## Step 7: Set Environment Variables

Create a `.env.local` file in your project root with the following variables:

\`\`\`env
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_CLIENT_EMAIL=sheets-integration@children-of-christ-forms.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_private_key_here\n-----END PRIVATE KEY-----"
\`\`\`

**Important Notes:**
- Replace `your_spreadsheet_id_here` with the ID from Step 5
- The client email should be: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com
- Replace `Your_private_key_here` with the `private_key` from the JSON file
- Keep the quotes around the private key and preserve the `\n` characters

## Step 8: Install Dependencies

Add the required dependencies to your project:

\`\`\`bash
npm install googleapis
\`\`\`

## Step 9: Initialize Spreadsheet

The application will automatically create the necessary sheets and headers when first run. The sheets created will be:

### Donations Sheet
- Timestamp
- Name
- Email
- Sponsorship Tier
- Other Amount
- Monthly Sponsorship
- IP Address

### Applications Sheet
- Timestamp
- Full Name
- Email
- Phone
- Address
- Adults
- Children
- Children Ages
- Monthly Income
- Income Source
- Government Assistance
- Need Description
- Intended Use
- IP Address

## Security Best Practices

1. **Environment Variables**: Never commit your `.env.local` file to version control
2. **Service Account Permissions**: Only grant necessary permissions to the service account
3. **Spreadsheet Access**: Limit spreadsheet sharing to only necessary personnel
4. **Data Encryption**: All data is transmitted over HTTPS
5. **Input Validation**: All form data is validated before being saved
6. **Error Handling**: Sensitive error information is not exposed to users

## Troubleshooting

### Common Issues

1. **"Spreadsheet not found" error**
   - Verify the spreadsheet ID is correct
   - Ensure the service account has access to the spreadsheet

2. **"Authentication failed" error**
   - Check that the service account credentials are correct
   - Verify the private key format (should include `\n` characters)

3. **"Permission denied" error**
   - Ensure the service account has "Editor" permissions on the spreadsheet
   - Verify the Google Sheets API is enabled

### Testing the Integration

1. Submit a test donation through the website
2. Check the "Donations" sheet for the new entry
3. Submit a test application through the website
4. Check the "Applications" sheet for the new entry

## Data Privacy and Compliance

- All form submissions include timestamps and IP addresses for audit purposes
- Personal information is stored securely in Google Sheets
- Access to the spreadsheet should be limited to authorized personnel only
- Consider implementing data retention policies as required by local regulations
- Ensure compliance with applicable privacy laws (GDPR, CCPA, etc.)

## Monitoring and Maintenance

- Regularly check the spreadsheet for new submissions
- Monitor server logs for any integration errors
- Keep the Google Sheets API credentials secure and rotate them periodically
- Back up the spreadsheet data regularly

## Support

If you encounter issues with the Google Sheets integration:

1. Check the server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test the Google Sheets API connection manually
4. Contact your development team for technical support

---

**Note**: This integration handles sensitive personal and financial information. Ensure all security best practices are followed and that your organization complies with relevant data protection regulations.
