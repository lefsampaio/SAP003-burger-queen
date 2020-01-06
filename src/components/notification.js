import { store } from 'react-notifications-component';

const notification = (obj) => {
    store.addNotification({
        title: obj.title,
        message: obj.message,
        type: obj.type,
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeInDown"],
        animationOut: ["animated", "fadeOutUp"],
        dismiss: {
            duration: 1500,
        }
    });
}

export default notification;