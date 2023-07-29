# Simple IDP
This Node.js program let's you run an IDP that works with the samlbug tenant and application.

## Prerequisites
You'll need a Node/npm environment on your computer to run this application.  This simplest way to
do this is to use nodenv (linux, macosx) or nvm-windows (windows).  This application was developed with
node 16.19.0.

## Installation/Running
To install/run, do the following:
* Clone the repository:  https://github.com/edlott/mock-saml
* Run the following in the root directory of this project:
```bash
npm install # Run this one time
npm run dev # Run this every time you want to start the application.
```
* Open your browser to http://localhost:4000

You'll be able to enter whatever you want for the user
(userid, first name, last name, email) and everything will work.

The other settings should be used as-is.
