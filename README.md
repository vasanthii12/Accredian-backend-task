
# Accredian Backend Task

Express.js backend for the referral marketing platform.
![Dashboard](app.mp4)
## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file based on `.env.sample`
4. Run database migrations:
```bash
npm run db:push
```
5. Start the server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file with these variables:
```
DATABASE_URL=<your-postgresql-url>
EMAIL_USER=<gmail-address>
EMAIL_PASSWORD=<gmail-app-password>
PORT=5000
NODE_ENV=development
```

## Email Configuration

To set up Gmail for sending referral emails:

1. Create or use an existing Gmail account
2. Enable 2-Step Verification:
   - Go to Google Account settings
   - Navigate to Security
   - Enable 2-Step Verification
3. Generate an App Password:
   - Go to Security > 2-Step Verification
   - Scroll to "App passwords"
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Enter "Accredian Referral System"
   - Click "Generate"
4. Use the generated 16-character password as `EMAIL_PASSWORD` in your .env file
5. Use your Gmail address as `EMAIL_USER` in your .env file

Note: Never commit your email credentials to version control!

## Deployment on Render

1. Push your code to GitHub
2. Create an account on Render (https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set the environment variables:
   - Add all variables from `.env`
   - Make sure to set `NODE_ENV=production`
6. Deploy!

## Features
- RESTful API endpoints
- PostgreSQL database integration
- Email notifications via Gmail
- Input validation

## Tech Stack
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Node.js
- Nodemailer
