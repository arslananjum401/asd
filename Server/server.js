import Express from "express";
import dotenv from 'dotenv';
dotenv.config({ path: "./Config/config.env" })
import CookieParser from 'cookie-parser';
import Irouter from "./Routers/InstituteRoutes.js";
import Aroutes from "./Routers/AdminRoutes.js";
import Srouter from "./Routers/StudentRoutes.js";
import cors from 'cors'
import { Server } from "socket.io";
import http from 'http';
import { SocketFunction } from './SocketIo.js';
import { CRoutes } from "./Routers/CommonRoutes.js";
import { Realtions } from "./Conn/Relations.js";
import path from 'path';
import { fileURLToPath } from 'url';
import stripe from "stripe";
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const Stripe = stripe(process.env.STRIPE_SECRET_KEY)

import paypal from 'paypal-rest-sdk';


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET 
});


const app = Express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["https://acf6-39-49-24-45.in.ngrok.io", "http://localhost:3000"],
  }
});

app.use(cors())
const Port = 9000

SocketFunction(io)
app.use(cors());
app.use(CookieParser())
app.use(Express.urlencoded({ limit: "50mb", extended: true }));
app.use(Express.json({ limit: "50mb" }))
app.use('/Institute', Irouter);
app.use('/Admin', Aroutes)
app.use('/', Srouter);
app.use('/Common', CRoutes)


app.post('/', (req, res) => {
  const filePath = path.join(__dirname, `/imae.jpg`);
  const stream = fs.createWriteStream(filePath);

  stream.on('open', () => req.pipe(stream));
  stream.on('drain', () => {
    // Calculate how much data has been piped yet
    const written = parseInt(stream.bytesWritten);
    const total = parseInt(req.headers['content-length']);
    const pWritten = (written / total * 100).toFixed(2)
    console.log(`Processing  ...  ${pWritten}% done`);
  });

  stream.on('close', () => {
    // Send a success response back to the client
    const msg = `Data uploaded to ${filePath}`;
    console.log('Processing  ...  100%');
    console.log(msg);
    res.status(200).send({ status: 'success', msg });
  });

  stream.on('error', err => {
    // Send an error message to the client
    console.error(err);
    res.status(500).send({ status: 'error', err });
  });

});

Realtions();

if (process.env.NODE_ENV === 'production') {

  app.use(Express.static('../client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  })
}
// Stripe.applePayDomains.create({
//   domain_name: 'https://195c-39-49-17-232.ap.ngrok.io'
// }).then((res)=>{
// // console.log(res)
// })
server.listen(Port, () => {
  console.log(`App  is  runnging on port ${Port}`)
});