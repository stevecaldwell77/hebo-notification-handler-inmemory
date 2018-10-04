const autoBind = require('auto-bind');

class NotificationHandlerInmemory {
    constructor() {
        this.notifications = [];
        autoBind(this);
    }

    storeNotification(name, notification) {
        this.notifications.push({
            name,
            notification,
        });
    }

    getNotifications() {
        return this.notifications;
    }

    numNotifications() {
        return this.notifications.length;
    }

    hasNotifications() {
        return this.numNotifications() > 0;
    }

    clear() {
        this.notifications = [];
    }

    // eslint-disable-next-line require-await
    async invalidEventsFound(notification) {
        this.storeNotification('invalidEventsFound', notification);
    }

    // eslint-disable-next-line require-await
    async eventWritten(notification) {
        this.storeNotification('eventWritten', notification);
    }
}

module.exports = NotificationHandlerInmemory;
