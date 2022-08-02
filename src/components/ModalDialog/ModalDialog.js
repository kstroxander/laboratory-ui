import './ModalDialog.css';

function ModalDialog({ isVisible, children, customClass }) {
    return(
        isVisible &&
        <div className="modal-backdrop">
            <div className={`modal-dialog ${customClass}`}>
                {children}
            </div>
        </div>
    );
}

export default ModalDialog;
