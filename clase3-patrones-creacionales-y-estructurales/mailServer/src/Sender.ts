import type Email from './types/Email.js';
import type SMS from './types/SMS.js';

interface ISender {
    sendMail(): void;
}

export function sendMessage(sender: ISender) {
    sender.sendMail();
}

export class SMSSender implements ISender {
    sms: SMS;

    constructor(sms: SMS) {
        this.sms = sms;
    }

    sendMail(): void {
        console.log({ sms: this.sms });
    }
}

export class EmailSender implements ISender {
    email: Email;

    constructor(email: Email) {
        this.email = email;
    }

    sendMail(): void {
        console.log({ email: this.email });
    }
}

export class EmailSenderWithSpamCheck implements ISender {
    private proxy: EmailSender;

    constructor(sender: EmailSender) {
        this.proxy = sender;
    }

    sendMail(): void {
        const { content } = this.proxy.email;
        if (content.includes('oferta')) {
            console.error('[SPAM]');
        } else {
            console.info('[INBOX]');
        }
        this.proxy.sendMail();
    }
}
