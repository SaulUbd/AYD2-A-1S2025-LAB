import { describe, test, expect, vi, Mock } from 'vitest';
import { User, NotificationMethod } from '../users.js';
import Notification from '../types/Notification.js';

const smsUser = new User({
    id: 0,
    name: 'Saul C.',
    prefs: {
        notificationMethod: NotificationMethod.SMS,
        phone: '12345678',
    },
});

const notif: Notification = {
    title: 'test',
    content: 'content',
};

global.fetch = vi.fn();

describe('User class', () => {
    test('Send SMS', async () => {
        (fetch as Mock).mockResolvedValueOnce({
            ok: true,
        });
        try {
            await smsUser.update(notif);
        } catch (error) {
            console.error(error);
        }
        expect(fetch).toBeCalled();
    });

    test('Fail sending SMS', async () => {
        (fetch as Mock).mockResolvedValueOnce({
            ok: false,
        });
        try {
            await smsUser.update(notif);
        } catch (error) {
            expect((error as Error).message).toBe(
                'There was an error when sending a notification'
            );
        }
        expect(fetch).toBeCalled();
    });
});
