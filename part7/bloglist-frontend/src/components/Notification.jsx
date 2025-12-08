import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (!notification) {
    return null;
  }

  const notificationStyles = {
    border: 'solid 2px',
    backgroundColor: 'cornsilk',
    padding: '4px',
    borderRadius: '4px',
  };
  return (
    <div
      style={{
        ...notificationStyles,
        color: notification.isError ? 'red' : 'green',
      }}>
      {notification.message}
    </div>
  );
};

export default Notification;
