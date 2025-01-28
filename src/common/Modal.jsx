/**
 * frontend/src/components/common/Modal.jsx
 *
 * A simple overlay with content in the center.
 * We can re-use it for Chat or any other popup.
 */
import "./Modal.css"; // optional for styling

export default function Modal({ isOpen, onClose, children }) {
	if (!isOpen) return null; // if not open, render nothing

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<button className="modal-close-btn" onClick={onClose}>
					X
				</button>
				{children}
			</div>
		</div>
	);
}
