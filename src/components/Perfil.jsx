import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Perfil(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="pb-3 text-center">
          <span className="h5">{props.user.displayName}</span>
        </div>
        <div className="text-center">
          <img src={props.user.photoURL} className="rounded" alt="perfil-img" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="col-md-12 text-center">
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default Perfil;
