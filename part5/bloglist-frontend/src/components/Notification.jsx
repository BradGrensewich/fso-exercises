const Notification = ({ notification }) => {
    if (!notification) {
    return null;
  }

  const notificationStyles = {
    border: "solid 2px",
    backgroundColor: 'cornsilk',
    padding: '4px',
    borderRadius: '4px'


  }
  return <div style={{...notificationStyles, color: notification.isError ? 'red' : 'green'}}>{notification.text}</div>;
};

export default Notification;
