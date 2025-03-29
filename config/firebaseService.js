const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCmq20FZ2g7YTjC\nHokXWfdXJ9cxc9mbLWUONEIQqDVS89mFmlE1jMaV6k2DTfvSICO7+/qgUAX/dBlK\nbNjY8h1uSq6pdT1rSk+LtiROOrxF0jIqW+mzRcDv/p3E8a4PE5XBhudlIH+9AQgo\n88s6pihxveokPGKtlufYXeBU1Aw0Uc8FMZTfLwouP8OWSICz5AJbdZ7P+Zz21Dc3\nKSSAwZ8IisD+sEfgprebSI7dPH4D/ANdoNgB+9Pz4u9gkipg/4oad+7QLaXMtoD0\nI8lMr/8HukfCp03ivxJfMsoeiZnnSyatGeyazkaxeqVdyXfO9fbTCo4Ln+rta08P\nEWSC81Z9AgMBAAECggEAFEYeCN4/S5nT8akNPA3xjGSIRLe27K1k8Ylhz+zmL6UB\n/MJ8xmrNbUcHDsXZsAHA1wkbv4x8bkqNGQSMjDdHZTcob+yXAAoWCwSo/esfI88h\n0w1DLE973LW4M1DCv4q+WMA0PZTqdO8/MtwVCJlVqiBT7vx5dGw635LryuXQZjyq\n+TZ10w9f/HiOyKFGHSV89c5hJay9g3ZYw0AkFQsHRyqlGnxEgddkOfherqkfA/5t\nY9M6Z611y6CpuZ+XKpHXaOXpC10OFFnn3AacSmx20bf5DON53DzfL7rHZAPU1xPe\nB/5h8lRmiITdeYXYK0Qaarg8tcdt7GCZJn1AwyYEcQKBgQDcpIPLcwNmvWlGYSnF\nx0kWkkH33mbF6vn9I4GWyFw1wCxAJFtvCOSagLC0C3aExDQXOf5oEaClML2/IgyH\n6vavc/ehnHhD6pNj6EGFQDzqYesK/bKcPHoLojfjM9J2p/krxEIZBOpRMy9vWT6a\nNjhc7zseXCvtvSIwAplqpEh07wKBgQDBYMLiKhveqTWxtIpIZd/UsAv+rEdWdjaT\nK2N/Kt+Odmu5l118Spht+78CzGJ/9PoaDUOyxI8oTgx7khm2LEWs9nudcSsf0Ksi\ngfpnd65BiPJ42ykkPFbmOJ0pfhJwGGCWd2inwuag8aksDOndLPZzQ61JeJnDQ5m9\nEiv1O5NjUwKBgGQ1n9oWGXRfEGIznOpDsZE7yhROgTTgnLt4ldGqnB6Zcj+Lg69x\nRYpaambLUf/IsLPf1gjkAKcl9PfK+g/9Ch7zt4NB8mk+L8TPZnqji0cUQ9ERGj7V\nRMTl3yYkkjDr50IWd8KvNdC9Q4z55nHZsE2dJaeLSzRFkzJk69LAXFwnAoGACvw/\nNe/kc2qzZSv3axN2erOhis8ook3G3edqGJBL8ODjT8C8i9IFBMJ3YGZR9ijpiE9W\nmDI4W7bLWL28/i9XqfK6pQAHzh/hiO1PV09iM9DezWTN2oQe/6cZroC99WY9Hm8c\nH+OfjGcOEDWPl4P1YCjpEDJssb4GXspIev7uaYcCgYEA1S2VZ21ScXETvv5xZ1mh\nSTJy9ESOBlaJ/incZe/w9zI5/lCkxNMFo5YTCJvlYuj4atlgDvp44fp7FGIQcHvK\ns/xf9Rc8Sx2WAtFZ9NLFOERZ06dwmmveHr8i/7EovKeRKvGFi9Ga333310EtSFY/\neMuXM5qT9G73NrwYNueSBy8=\n-----END PRIVATE KEY-----\n",
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    }),
  });

  console.log('✅ Firebase Admin initialized');
} else {
  console.log('ℹ️ Firebase Admin already initialized');
}

module.exports = admin;
