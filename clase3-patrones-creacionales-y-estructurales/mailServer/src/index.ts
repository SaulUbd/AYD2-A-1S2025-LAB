import express from 'express';
import type Email from './types/Email.js';
import type SMS from './types/SMS.js';
import {
    sendMessage,
    EmailSenderWithSpamCheck,
    EmailSender,
    SMSSender,
} from './Sender.js';

const app = express();

app.use(express.json());

app.post('/email', (req, res) => {
    const email = req.body as Email;
    const sender = new EmailSender(email);
    const spamProxy = new EmailSenderWithSpamCheck(sender);

    sendMessage(spamProxy);
    res.send('mail received');
});

app.post('/sms', (req, res) => {
    const sms = req.body as SMS;
    const sender = new SMSSender(sms);

    sendMessage(sender);
    res.send('sms received');
});

const port = 3000;
app.listen(port, () => {
    console.log('email server listening on: ' + port);
});
