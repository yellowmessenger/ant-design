import OriginModal, { ModalFuncProps, destroyFns } from './Modal';
import confirm, {
  withWarn,
  withDelete,
  withInfo,
  withSuccess,
  withError,
  withConfirm,
  ModalStaticFunctions,
  globalConfig,
} from './confirm';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props));
}

type Modal = typeof OriginModal &
  ModalStaticFunctions & { destroyAll: () => void; config: typeof globalConfig };
const Modal = OriginModal as Modal;

Modal.info = function infoFn(props: ModalFuncProps) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props: ModalFuncProps) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props: ModalFuncProps) {
  return confirm(withError(props));
};

Modal.warning = modalWarn;

Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  return confirm(withConfirm(props));
};

Modal.delete = function confirmFn(props: ModalFuncProps) {
  return confirm(withDelete(props));
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

Modal.config = globalConfig;

export default Modal;
