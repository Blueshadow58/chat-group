import React, { useState } from "react";
import SideBarUserCard from "./SideBarUserCard";

import SideBarHeader from "./SideBars/Header";
import SeeChannels from "./SideBars/SeeChannels";
import SeeMembers from "./SideBars/SeeMembers";

const SideBar = ({ user, signOut, handleClose }) => {
  const [sideBar, setSideBar] = useState(false);
  const changeSideBar = () => setSideBar(!sideBar);

  // const [activeChannel, setActiveChannel] = useState(false);
  // console.log(activeChannel);

  return (
    <>
      {/* Header */}
      <SideBarHeader
        sideBar={sideBar}
        changeSideBar={changeSideBar}
        handleClose={handleClose}
      />
      {sideBar ? <SeeMembers /> : <SeeChannels />}

      {/* Footer */}
      <SideBarUserCard user={user} signOut={signOut} />
    </>
  );
};

export default SideBar;
