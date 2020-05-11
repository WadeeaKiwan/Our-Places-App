import React from "react";
import ReactDOM from "react-dom";

import "./SideDrawer.css";

const SideDrawer: React.FC = (props) => {
  const content = <aside className='side-drawer'>{props.children}</aside>;

  return ReactDOM.createPortal(content, (document as any).getElementById("drawer-hook"));
};

export default SideDrawer;
