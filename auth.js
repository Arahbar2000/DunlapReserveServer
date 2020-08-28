const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const {BASE_URL, AUDIENCE, GOOGLE_CLIENT_ID} = require('./config')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

module.exports = {
    googleAuth: async (req, res, next) => {
      async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.headers.authorization,
            audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.payload
        console.log(payload)
        const userid = payload['sub'];
        console.log(userid)
        req.googleId = userid;
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
      }
      verify()
      return next()
    }
}