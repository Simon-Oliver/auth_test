import React, { useState } from "react";
import styles from "./Modal.module.css";
import { Button, Header, Image, Modal } from "semantic-ui-react";

export default function TestModal({ toggleModal, show, children }) {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      onClose={toggleModal}
      onOpen={toggleModal}
      open={show}
      //   trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Default Profile Image</Header>
          {children}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Done"
          labelPosition="right"
          icon="checkmark"
          onClick={toggleModal}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

// export default function Modal({ toggleModal, show, children }) {

//     return (
//         <>
//             {show && (<div className={styles.modalContainer} onClick={toggleModal}>
//                 <div className={styles.modalBackground} onClick={(e) => e.stopPropagation()}>
//                     {children}
//                     <button onClick={toggleModal}>Close</button>
//                 </div>

//             </div>)}
//         </>
//     )
// }
