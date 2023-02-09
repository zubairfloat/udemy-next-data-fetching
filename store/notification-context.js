import { createContext } from "react";

const NotificationConext = createContext({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  return (
    <NotificationConext.Provider>{props.children}</NotificationConext.Provider>
  );
}

export default NotificationConext;
