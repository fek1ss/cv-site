import styles from './basemodal.module.scss';
import { IoClose } from "react-icons/io5";


const BaseModal = ({
  title,
  onClose,
  onSubmit,
  children,
  footer,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modal__top}>
          {title && <h2 className={styles.modal__title}>{title}</h2>}
          <IoClose onClick={onClose} className={styles.modal__closeBtn} />

        </div>

        <form onSubmit={onSubmit}>
          {children}

          <div className={styles.modalActions}>{footer}</div>
        </form>
      </div>
    </div>
  );
};

export default BaseModal;
