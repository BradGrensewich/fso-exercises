const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div className='error'>{errorMessage}</div>;
};

export default Notification