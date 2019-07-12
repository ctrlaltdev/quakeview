export const newNotification = (title, content) => {
    return new Notification(title, { body: content })
}