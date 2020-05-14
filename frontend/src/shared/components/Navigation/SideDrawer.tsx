import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

type Props = Readonly<{
  show: boolean;
  onClick: () => void;
}>;

const SideDrawer: React.FC<Props> = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={1000}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside className='side-drawer' onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, (document as any).getElementById("drawer-hook"));
};

export default SideDrawer;
