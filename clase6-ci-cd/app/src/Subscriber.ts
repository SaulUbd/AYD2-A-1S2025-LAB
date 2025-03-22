import { User } from './users.js';
import Notification from './types/Notification.js';

export interface Subscriber {
    update(notification: Notification): Promise<void>;
}

export class NotificationPublisher {
    private subscribers: { [id: number]: Subscriber };

    constructor() {
        this.subscribers = {};
    }

    subscribe(sub: User) {
        this.subscribers[sub.id] = sub;
    }

    unsubscribe(sub: User) {
        delete this.subscribers[sub.id];
    }

    async notify(notification: Notification) {
        for (const sub of Object.values(this.subscribers)) {
            await sub.update(notification);
        }
    }
}
