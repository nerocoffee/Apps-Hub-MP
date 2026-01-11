# Supabase Backend Integration Guide for Apps Hub

This guide will help you integrate Supabase as the backend for your Apps Hub application deployed at appshub.pro.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed locally
- Your existing React app from the GitHub repo

## Step 1: Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - **Project Name**: Apps Hub
   - **Database Password**: (create a strong password and save it)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for setup to complete

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

This will create:
- **profiles** table for user data
- **tools** table for your tool configurations
- **content_library** table for user-generated content
- **activities** table for usage tracking
- **user_tool_configs** table for personalized settings
- Row Level Security (RLS) policies for data protection
- Automatic triggers and functions

## Step 3: Enable Authentication

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Enable the providers you want:
   - **Email** (already enabled by default)
   - **Google** (optional - requires OAuth setup)
   - **GitHub** (optional - requires OAuth setup)
3. Configure email templates under **Authentication** → **Email Templates**

## Step 4: Configure Storage (Optional but Recommended)

For file uploads (images, videos, etc.):

1. Go to **Storage** in Supabase dashboard
2. Click "New bucket"
3. Create a bucket named `content-files`
4. Set it to **Public** or **Private** based on your needs
5. Configure RLS policies for the bucket

## Step 5: Get Your Supabase Credentials

1. Go to **Settings** → **API** in Supabase dashboard
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (this is safe to use in frontend)

## Step 6: Install Dependencies

In your local project directory, install the Supabase client:

```bash
npm install @supabase/supabase-js
```

## Step 7: Configure Environment Variables

1. Create a `.env.local` file in your project root (copy from `.env.example`)
2. Add your Supabase credentials:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Add `.env.local` to your `.gitignore` to keep credentials secure!

## Step 8: Deploy to Netlify with Environment Variables

Since your app is already deployed on Netlify:

1. Go to your Netlify dashboard
2. Select your Apps Hub project
3. Go to **Site settings** → **Environment variables**
4. Add the environment variables:
   - `REACT_APP_SUPABASE_URL` = your Supabase URL
   - `REACT_APP_SUPABASE_ANON_KEY` = your anon key
5. Trigger a new deployment

## Step 9: Update Your React Components

The following files have been created to help you integrate Supabase:

### Core Files
- **`lib/supabase.ts`** - Supabase client initialization and TypeScript types
- **`hooks/useAuth.ts`** - Authentication hook for sign in/up/out
- **`hooks/useTools.ts`** - Hook to fetch tools from database
- **`hooks/useContentLibrary.ts`** - Hook to manage user content
- **`hooks/useActivity.ts`** - Hook to track user activities

### Example Usage in Components

#### Update `pages/Dashboard.tsx`:

```typescript
import { useTools } from '../hooks/useTools'
import { useAuth } from '../hooks/useAuth'

export function Dashboard() {
  const { tools, loading } = useTools()
  const { profile } = useAuth()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Welcome back, {profile?.full_name || 'User'}</h1>
      {/* Use tools from database instead of hardcoded array */}
      {tools.map(tool => (
        <ToolCard key={tool.id} {...tool} />
      ))}
    </div>
  )
}
```

#### Update `pages/ContentLibrary.tsx`:

```typescript
import { useContentLibrary } from '../hooks/useContentLibrary'

export function ContentLibrary() {
  const { content, loading, addContent, deleteContent } = useContentLibrary()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {/* Display content from database */}
      {content.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <button onClick={() => deleteContent(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

## Step 10: Add Authentication UI

Create a login/signup page:

```typescript
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signUp } = useAuth()

  const handleSignIn = async () => {
    const { error } = await signIn(email, password)
    if (error) alert(error.message)
  }

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}
```

## Step 11: Database Functions (Optional)

Add this SQL function for incrementing credits:

```sql
CREATE OR REPLACE FUNCTION increment_credits(user_id UUID, amount INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET credits_used = credits_used + amount
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Testing Your Integration

1. **Test Authentication**:
   - Sign up a new user
   - Check if profile is created in `profiles` table
   - Test sign in/out

2. **Test Tools**:
   - Verify tools appear from database
   - Check if tools data matches

3. **Test Content Library**:
   - Create new content
   - Verify it appears in `content_library` table
   - Test delete and update operations

## Security Best Practices

1. **Never expose** the `service_role` key in frontend code
2. Use Row Level Security (RLS) policies (already set up in schema)
3. Validate all user inputs
4. Use the `anon` key only for public operations
5. Store sensitive data in environment variables
6. Enable email verification for new signups

## Monitoring and Analytics

1. Go to **Database** → **Query Performance** to monitor slow queries
2. Use **Authentication** → **Users** to manage users
3. Check **Logs** for debugging

## Next Steps

1. Implement file upload to Supabase Storage
2. Add real-time subscriptions for live updates
3. Implement usage tracking and analytics
4. Add advanced search and filtering
5. Set up automated backups

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase React Quickstart](https://supabase.com/docs/guides/with-react)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## Troubleshooting

**Issue**: "Invalid API key"
- Check that environment variables are correct
- Ensure `.env.local` file is in project root
- Restart dev server after changing env variables

**Issue**: "Row Level Security policy violation"
- Make sure user is authenticated
- Check RLS policies in Supabase dashboard
- Verify user_id matches authenticated user

**Issue**: "Network error"
- Check Supabase URL is correct
- Verify project is not paused (free tier limitation)
- Check CORS settings if needed

## Support

If you need help:
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- GitHub Issues: Create an issue in your repo
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
