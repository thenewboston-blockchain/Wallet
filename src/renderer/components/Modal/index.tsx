import {CSSProperties, ReactNode, useMemo} from 'react';
import {createPortal} from 'react-dom';
import noop from 'lodash/noop';

import {ButtonType, Form, FormButton, FormButtonProps} from 'renderer/components/FormElements';
import Loader from 'renderer/components/FormElements/Loader';
import {GenericFormValues, GenericFunction, SFC} from 'shared/types';

import * as S from './Styles';

export interface ModalButtonProps extends FormButtonProps {
  content: ReactNode;
}

interface ComponentProps {
  close(): void;
  disableOverlayClick?: boolean;
  displayCloseButton?: boolean;
  displaySubmitButton?: boolean;
  footer?: ReactNode;
  header?: ReactNode;
  hideFooter?: boolean;
  ignoreDirty?: boolean;
  initialValues?: GenericFormValues;
  onSubmit?: GenericFunction;
  style?: CSSProperties;
  submitButton?: ModalButtonProps | string;
  submitting?: boolean;
  validateOnMount?: boolean;
  validationSchema?: any;
}

const Modal: SFC<ComponentProps> = ({
  children,
  className,
  close,
  disableOverlayClick = false,
  displaySubmitButton = true,
  footer,
  header,
  hideFooter = false,
  displayCloseButton = true,
  ignoreDirty: ignoreDirtyProps = false,
  initialValues = {},
  onSubmit,
  submitButton,
  submitting = false,
  validateOnMount,
  validationSchema,
}) => {
  const ignoreDirty = useMemo<boolean>(
    () => ignoreDirtyProps || Object.keys(initialValues).length === 0,
    [ignoreDirtyProps, initialValues],
  );

  const submitProps = useMemo<Omit<ModalButtonProps, 'children'>>(() => {
    if (typeof submitButton === 'string') {
      return {
        content: submitButton,
        ignoreDirty,
        submitting,
        type: ButtonType.submit,
      };
    }
    return {
      color: submitButton?.color ?? undefined,
      content: submitButton?.content ?? 'Submit',
      disabled: submitButton?.disabled ?? undefined,
      ignoreDirty: submitButton?.ignoreDirty ?? ignoreDirty,
      onClick: submitButton?.onClick ?? undefined,
      submitting: submitButton?.submitting ?? submitting,
      type: submitButton?.type ?? ButtonType.submit,
      variant: submitButton?.variant ?? undefined,
    };
  }, [ignoreDirty, submitButton, submitting]);

  const renderDefaultFooter = (): ReactNode => {
    return (
      <>
        {displaySubmitButton && (
          <FormButton
            color={submitProps.color}
            disabled={submitProps.disabled}
            ignoreDirty={submitProps.ignoreDirty}
            onClick={submitProps.onClick}
            submitting={submitProps.submitting}
            type={submitProps.type}
            variant={submitProps.variant}
          >
            {submitting ? <Loader /> : submitProps.content}
          </FormButton>
        )}
      </>
    );
  };

  return createPortal(
    <>
      <S.Overlay $submitting={submitting} onClick={submitting || disableOverlayClick ? noop : close} />
      <S.Container className={className}>
        <S.Header>
          {typeof header === 'string' ? <h2>{header}</h2> : header}
          {displayCloseButton && <S.CloseIcon $submitting={submitting} disabled={submitting} onClick={close} />}
        </S.Header>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit || noop}
          validateOnMount={validateOnMount}
          validationSchema={validationSchema}
        >
          <S.MainContent $noFooter={hideFooter}>{children}</S.MainContent>
          {!hideFooter && <S.Footer>{footer || renderDefaultFooter()}</S.Footer>}
        </Form>
      </S.Container>
    </>,
    document.getElementById('modal-root')!,
  );
};

export {S as ModalStyles};
export default Modal;
