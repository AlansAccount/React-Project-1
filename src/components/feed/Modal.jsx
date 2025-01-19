// Modal.jsx
import { createPortal } from "react-dom";
import styles from "./Modal.module.css"; // We'll define the CSS next

export default function Modal({ children, onClose, title }) {
	return createPortal(
		<>
			{/* (1) Dim overlay that covers the entire screen */}
			<div className={styles.modalOverlay} onClick={onClose}>
				{/* (2) 'dialog' container; we stopPropagation of click so we don't close if user clicks inside */}
				<dialog
					className={styles.modalDialog}
					open
					onClick={(e) => e.stopPropagation()}
				>
					{/* (3) Optional header or title */}
					<h4>{title}</h4>
					{children}
				</dialog>
			</div>
		</>,
		document.getElementById("modal") // same as your createPortal target
	);
}
