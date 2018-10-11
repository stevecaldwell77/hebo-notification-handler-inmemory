const test = require('ava');
const shortid = require('shortid');
const { validateNotificationHandler } = require('hebo-validation');
const NotificationHandlerInmemory = require('..');

test('passes validator', t => {
    const handler = new NotificationHandlerInmemory();
    const { error } = validateNotificationHandler(handler);
    t.is(error, null, 'no error generated by validation');
});

test('invalidEventsFound()', async t => {
    const handler = new NotificationHandlerInmemory();

    const notfication1 = {
        aggregateName: 'library',
        aggregateId: shortid.generate(),
        eventIds: [shortid.generate()],
    };

    const notfication2 = {
        aggregateName: 'author',
        aggregateId: shortid.generate(),
        eventIds: [shortid.generate(), shortid.generate()],
    };

    await handler.invalidEventsFound(notfication1);
    await handler.invalidEventsFound(notfication2);

    t.deepEqual(handler.getNotifications(), [
        { name: 'invalidEventsFound', notification: notfication1 },
        { name: 'invalidEventsFound', notification: notfication2 },
    ]);
});

test('eventWritten()', async t => {
    const handler = new NotificationHandlerInmemory();

    const notfication1 = {
        aggregateName: 'library',
        aggregateId: shortid.generate(),
        eventType: 'CREATED',
    };

    const notfication2 = {
        aggregateName: 'author',
        aggregateId: shortid.generate(),
        eventType: 'NAME_SET',
    };

    await handler.eventWritten(notfication1);
    await handler.eventWritten(notfication2);

    t.deepEqual(handler.getNotifications(), [
        { name: 'eventWritten', notification: notfication1 },
        { name: 'eventWritten', notification: notfication2 },
    ]);
});
