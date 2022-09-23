import React, { useRef, useState } from "react";
import { Button, Form, InputGroup, Overlay, Popover } from "react-bootstrap";

const AddMember = () => {
  const [show, setShow] = useState(false);
  //   const target = useRef(null);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    // <>
    //   <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
    //     Click me to see
    //   </Button>
    //   <Overlay target={target.current} show={show} placement="right">
    //     {({ placement, arrowProps, show: _show, popper, ...props }) => (
    //       <div
    //         {...props}
    //         style={{
    //           position: "absolute",
    //           backgroundColor: "rgba(255, 100, 100, 0.85)",
    //           padding: "2px 10px",
    //           color: "white",
    //           borderRadius: 3,
    //           ...props.style,
    //         }}
    //       >
    //         <>
    //           <Popover>
    //             <Popover.Header className="text-dark" as="h3">
    //               yasghashjdas
    //             </Popover.Header>
    //             <Popover.Body>
    //               <InputGroup className="">
    //                 <Form.Control placeholder="example@gmail.com" />
    //                 <Button variant="primary">Add</Button>
    //               </InputGroup>
    //             </Popover.Body>
    //           </Popover>
    //         </>
    //       </div>
    //     )}
    //   </Overlay>
    // </>
    <div ref={ref}>
      <Button size="sm" onClick={handleClick}>
        Add Member
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        // style={{ position: "absolute" }}
        // containerPadding={20}
      >
        <Popover>
          <Popover.Header className="text-dark" as="h3">
            New channel member
            {/* <Button onClick={() => setShow(!show)}>sdfsdf</Button> */}
          </Popover.Header>
          <Popover.Body>
            <InputGroup className="">
              <Form.Control placeholder="example@gmail.com" />
              <Button variant="primary">Add</Button>
            </InputGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default AddMember;
