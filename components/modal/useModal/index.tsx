import * as React from 'react';
import { ModalFuncProps } from '../Modal';
import usePatchElement from '../../_util/hooks/usePatchElement';
import HookModal, { HookModalRef } from './HookModal';
import {
  withConfirm,
  ModalStaticFunctions,
  withInfo,
  withSuccess,
  withError,
  withWarn,
  withDelete,
} from '../confirm';

let uuid = 0;

export default function useModal(): [Omit<ModalStaticFunctions, 'warn'>, React.ReactElement] {
  const [elements, patchElement] = usePatchElement();

  function getConfirmFunc(withFunc: (config: ModalFuncProps) => ModalFuncProps) {
    return function hookConfirm(config: ModalFuncProps) {
      uuid += 1;

      const modalRef = React.createRef<HookModalRef>();

      let closeFunc: Function;
      const modal = (
        <HookModal
          key={`modal-${uuid}`}
          config={withFunc(config)}
          ref={modalRef}
          afterClose={() => {
            closeFunc();
          }}
        />
      );

      closeFunc = patchElement(modal);

      return {
        destroy: () => {
          if (modalRef.current) {
            modalRef.current.destroy();
          }
        },
        update: (newConfig: ModalFuncProps) => {
          if (modalRef.current) {
            modalRef.current.update(newConfig);
          }
        },
      };
    };
  }

  return [
    {
      info: getConfirmFunc(withInfo),
      success: getConfirmFunc(withSuccess),
      error: getConfirmFunc(withError),
      warning: getConfirmFunc(withWarn),
      confirm: getConfirmFunc(withConfirm),
      delete: getConfirmFunc(withDelete),
    },
    <>{elements}</>,
  ];
}
