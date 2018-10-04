const test = require('ava');
const shortid = require('shortid');
const NotificationHandlerInmemory = require('..');

const setupTest = async () => {
    const handler = new NotificationHandlerInmemory();

    await handler.invalidEventsFound({
        aggregateName: 'library',
        aggregateId: shortid.generate(),
        eventIds: [shortid.generate()],
    });

    await handler.eventWritten({
        aggregateName: 'author',
        aggregateId: shortid.generate(),
        eventType: 'NAME_SET',
    });

    return handler;
};

test('numNotifications()', async t => {
    const handler = await setupTest();
    t.is(handler.numNotifications(), 2, 'returns number of notifications');
});

test('hasNotifications()', async t => {
    const handler1 = new NotificationHandlerInmemory();
    t.false(
        handler1.hasNotifications(),
        'returns false if we do not have notifications',
    );

    const handler2 = await setupTest();
    t.true(
        handler2.hasNotifications(),
        'returns true if we have notifications',
    );
});

test('clear()', async t => {
    const handler = await setupTest();
    handler.clear();
    t.false(handler.hasNotifications(), 'clears notifications');
});
