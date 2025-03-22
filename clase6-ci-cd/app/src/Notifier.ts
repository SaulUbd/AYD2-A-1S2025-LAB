import Email from './types/Email.js';
import Notification from './types/Notification.js';
import SMS from './types/SMS.js';
import { User } from './users.js';

abstract class NotificationStrat {
    protected user: User;

    constructor(user: User) {
        this.user = user;
    }

    abstract send(notification: Notification): Promise<boolean>;
}

export class NotificationSender {
    private strategy!: NotificationStrat;

    setStrategy(strat: NotificationStrat): void {
        this.strategy = strat;
    }

    async send(notification: Notification): Promise<void> {
        if (!this.strategy) throw new Error('strategy not defined');
        const result = await this.strategy.send(notification);

        if (!result) {
            throw new Error('There was an error when sending a notification');
        }
    }
}

export class SMSSend extends NotificationStrat {
    constructor(user: User) {
        super(user);
    }

    async send(notification: Notification) {
        const notif: SMS = {
            phone: this.user.preferences.phone!,
            text: `${notification.title.toUpperCase()}\n\n${
                notification.content
            }
            `,
        };

        const res = await fetch('http://mail_server:3000/sms', {
            method: 'post',
            body: JSON.stringify(notif),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return res.ok;
    }
}

export class EmailSend extends NotificationStrat {
    constructor(user: User) {
        super(user);
    }

    async send(notification: Notification) {
        const notif: Email = {
            address: this.user.preferences.email!,
            subject: notification.title,
            content: notification.content,
        };

        const res = await fetch('http://mail_server:3000/email', {
            method: 'post',
            body: JSON.stringify(notif),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return res.ok;
    }
}
