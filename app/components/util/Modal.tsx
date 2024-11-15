type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="presentation">
      <dialog
        className="modal"
        open
        onClick={(event: React.MouseEvent<HTMLDialogElement>) =>
          event.stopPropagation()
        }
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        tabIndex={0}
        aria-label="Close modal">
        {children}
      </dialog>
    </div>
  );
}
