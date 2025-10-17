const Notification = ({ notification }) => {
  if (!notification) return null;
  const notificationStyles = {
    color: notification.isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };
  return <div style={notificationStyles}>{notification.message}</div>;
};

export default Notification;
