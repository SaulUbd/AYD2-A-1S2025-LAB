import { EmailSend, NotificationSender, SMSSend } from './Notifier.js';
import { Subscriber } from './Subscriber.js';
import Notification from './types/Notification.js';

enum NotificationMethod {
    EMAIL,
    SMS,
}

interface Preferences {
    notificationMethod: NotificationMethod;
    email?: string;
    phone?: string;
}

interface UserProps {
    id: number;
    name: string;
    prefs: Preferences;
}

export class User implements Subscriber {
    id: number;
    name: string;
    preferences: Preferences;
    private notificationSender: NotificationSender;

    constructor({ id, name, prefs }: UserProps) {
        this.id = id;
        this.name = name;
        this.preferences = prefs;
        this.notificationSender = new NotificationSender();
    }

    async update(notification: Notification): Promise<void> {
        switch (this.preferences.notificationMethod) {
            case NotificationMethod.EMAIL:
                this.notificationSender.setStrategy(new EmailSend(this));
                break;
            case NotificationMethod.SMS:
                this.notificationSender.setStrategy(new SMSSend(this));
                break;
        }
        await this.notificationSender.send(notification);
    }
}

let id = 0;

export const users: User[] = [
    new User({
        id: id++,
        name: 'Saul C.',
        prefs: {
            notificationMethod: NotificationMethod.SMS,
            phone: '12345678',
        },
    }),
    new User({
        id: id++,
        name: 'Pepito P.',
        prefs: {
            notificationMethod: NotificationMethod.EMAIL,
            email: 'pepito@mail.com',
        },
    }),
    new User({
        id: id++,
        name: 'Maria M.',
        prefs: {
            notificationMethod: NotificationMethod.EMAIL,
            email: 'maria@mail.com',
        },
    }),
];
