const Notification = require('../models/notificationModel');

// Create Notification
exports.createNotification = async (req, res) => {
    const { userId,type, message } = req.body;

    try {
        const notification = new Notification({ userId,type, message });
        await notification.save();
        res.status(201).send(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while creating the notification.');
    }
};

// Get Notifications for a User
exports.getNotificationsByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const notifications = await Notification.find({ userId });
        res.send(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while fetching notifications.');
    }
};

// Mark Notification as Read
exports.markAsRead = async (req, res) => {
    const notificationId = req.params.id;

    try {
        const notification = await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
        if (!notification) return res.status(404).send('Notification not found.');
        res.send(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while updating the notification.');
    }
};

// Delete Notification
exports.deleteNotification = async (req, res) => {
    const notificationId = req.params.id;

    try {
        const notification = await Notification.findByIdAndDelete(notificationId);
        if (!notification) return res.status(404).send('Notification not found.');
        res.send('Notification deleted successfully.');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while deleting the notification.');
    }
};
