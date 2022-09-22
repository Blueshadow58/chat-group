import { createContext, useState } from "react";

export const ChannelContext = createContext({});

const ChannelProvider = ({ children }) => {
  const [channel, setChannel] = useState("");

  const changeChannel = (channelName) => {
    setChannel(channelName);
    //getChannel(channelName);
  };

  const getChannel = (data) => {
    console.log(data);
  };

  const valueToShare = {
    channel,
    changeChannel,
  };
  return (
    <ChannelContext.Provider value={valueToShare}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
