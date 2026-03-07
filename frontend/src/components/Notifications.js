import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Notification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, notification.duration || 4000);

    return () => clearTimeout(timer);
  }, [notification, onClose]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  const colors = {
    success: 'notification-success',
    error: 'notification-error',
    info: 'notification-info',
  };

  return (
    <div className={`notification ${colors[notification.type] || 'notification-info'}`}>
      <div className="notification-icon">{icons[notification.type]}</div>
      <div className="notification-content">
        <div className="notification-title">{notification.title}</div>
        {notification.message && <div className="notification-message">{notification.message}</div>}
      </div>
      <button className="notification-close" onClick={() => onClose(notification.id)}>
        <X size={16} />
      </button>
    </div>
  );
};

const NotificationContainer = ({ notifications, onClose }) => {
  return (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} onClose={onClose} />
      ))}
    </div>
  );
};

export default NotificationContainer;