import express from 'express';
import { users } from './users.js';
import Notification from './types/Notification.js';
import { NotificationPublisher } from './Subscriber.js';

const app = express();
const publisher = new NotificationPublisher();

app.use(express.json());

app.get('/users', (_, res) => {
    res.json(users);
});

app.post('/sub/:id', (req, res) => {
    const id = Number(req.params['id']);
    const user = users.filter((user) => user.id == id)[0];
    publisher.subscribe(user);
    res.send(`${user.name} has been subscribed`);
});

app.delete('/sub/:id', (req, res) => {
    const id = Number(req.params['id']);
    const user = users.filter((user) => user.id == id)[0];
    publisher.unsubscribe(user);
    res.send(`${user.name} has been unsubscribed`);
});

app.post('/notification', (req, res) => {
    const notification = req.body as Notification;
    publisher.notify(notification);
    console.log('cambio');
    res.send('Notifications sent');
});

const port = 3001;
app.listen(port, () => {
    console.log('App listening on port ' + port);
});
