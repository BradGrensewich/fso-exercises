interface ErrorNotificationProps {
  errorMessage: string;
}

const ErrorNotification = ({ errorMessage }: ErrorNotificationProps) => {
  if (errorMessage === '') return null;
  return (
    <div>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorNotification;
