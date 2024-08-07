## Shield - Password Manager

Open-source secure password manager with encryption, authentication and email verification.

## Screenshots

screenshots of the application.

### Login

![login](/public/login.png)

### Signup

![signup](/public/signup.png)

### Email Verification

![otp](/public/otp.png)

### Emai

![email](/public/email.png)

### Dashboard after adding passwords

![dash](/public/pwd.png)

### Add new password

![add](/public/add.png)

### Manage

![manage](/public/manage.png)

## Technologies used

- Next.js
- MongoDB
- Node.js
- TailwindCSS
- EmailJS
- Nodemailer
- Crypto
- BcryptJS

## Setup Guide

- Fork this repo
- Clone the repo locally

```bash
git clone https://github.com/[username]/shield.git
```

- Install dependencies

```bash
npm install
```

- Setup Mongodb
- Add app from your google account from account manage page and copy the 16 digits password and your email

- Setup env variables

```bash
MONGO_URI=''
NEXTAUTH_SECRET=''
NEXTAUTH_URL=''

GMAIL_USER='' // your email
GMAIL_PASS='' // app password

ENCRYPTION_KEY=''
```

- Start the application

```bash
npm run dev
```

- Open `http://localhost:3000` in your browser

## Contribution

- Fork the repo
- Checkout to branch
- Code whatever you want to add

Submit a pull request i will review it and merge it

## Sponser

<iframe src="https://github.com/sponsors/r2hu1/button" title="Sponsor r2hu1" height="32" width="114" style="border: 0; border-radius: 6px;"></iframe>

<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="r2hu1" data-color="#FFDD00" data-emoji="☕"  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>