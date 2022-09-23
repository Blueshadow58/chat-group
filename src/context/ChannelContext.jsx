import { createContext, useState } from "react";

export const ChannelContext = createContext({});

const ChannelProvider = ({ children }) => {
  const [channel, setChannel] = useState([]);
  const [user, setUser] = useState([]);

  const changeChannel = (data) => {
    setChannel(data);
  };

  const currentUser = (user) => {
    setUser(user);
  };

  const valueToShare = {
    channel,
    user,
    changeChannel,
    currentUser,
  };
  return (
    <ChannelContext.Provider value={valueToShare}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
