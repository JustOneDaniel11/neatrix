# Google OAuth Setup for Supabase

## Configuration Steps

1. Log in to the [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to Authentication > Providers
4. Find Google in the list of providers and click "Edit"
5. Enable the Google provider by toggling the switch
6. Enter your Google OAuth credentials:
   - Client ID: `VITE_GOOGLE_CLIENT_ID` (from your .env file)
   - Client Secret: `VITE_GOOGLE_CLIENT_SECRET` (from your .env file)
7. Add the following Authorized Redirect URL:
   - `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
   - Replace `[YOUR-PROJECT-REF]` with your Supabase project reference
8. Save the configuration

## Environment Variables Setup

Create or update your `.env` file with the following variables:
```
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Verify Configuration

1. Go to Authentication > URL Configuration
2. Ensure your Site URL is correctly set
3. Add your application's domain to the Redirect URLs list if needed

## Testing

1. Open your application
2. Navigate to the Login or Signup page
3. Click the "Sign in with Google" button
4. You should be redirected to Google's authentication page
5. After successful authentication, you'll be redirected back to your application

## Troubleshooting

If you encounter issues:
1. Check browser console for errors
2. Verify redirect URLs are correctly configured
<<<<<<< HEAD
3. Ensure the Google OAuth credentials are correct
4. Check Supabase authentication logs for detailed error messages

## Verify Configuration

1. Go to Authentication > URL Configuration
2. Ensure your Site URL is correctly set
3. Add your application's domain to the Redirect URLs list if needed

## Testing

1. Open your application
2. Navigate to the Login or Signup page
3. Click the "Sign in with Google" button
4. You should be redirected to Google's authentication page
5. After successful authentication, you'll be redirected back to your application

## Troubleshooting

If you encounter issues:
1. Check browser console for errors
2. Verify redirect URLs are correctly configured
3. Ensure the Google OAuth credentials are correct
=======
3. Ensure the Google OAuth credentials are correctly set in your .env file
>>>>>>> 17a6102 (secure Google OAuth setup using environment variables)
4. Check Supabase authentication logs for detailed error messages