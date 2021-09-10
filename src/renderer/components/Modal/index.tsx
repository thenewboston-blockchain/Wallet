import React, {CSSProperties, FC, ReactNode, useMemo} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import noop from 'lodash/noop';
import {bemify} from '@thenewboston/utils';

import {Form, FormButton, FormButtonProps} from '@renderer/components/FormComponents';
import {ButtonType, ButtonVariant} from '@renderer/components/FormElements';
import Loader from '@renderer/components/FormElements/Loader';

import {GenericFormValues, GenericFunction} from '@renderer/types';

import * as S from './Styles';

export interface ModalButtonProps extends FormButtonProps {
  content: ReactNode;
}

interface ComponentProps {
  cancelButton?: ModalButtonProps | string;
  className?: string;
  close(): void;
  disableOverlayClick?: boolean;
  displayCancelButton?: boolean;
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

const Modal: FC<ComponentProps> = ({
  cancelButton,
  children,
  className,
  close,
  disableOverlayClick = false,
  displayCancelButton = true,
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
  const ignoreDirty = useMemo<boolean>(() => ignoreDirtyProps || Object.keys(initialValues).length === 0, [
    ignoreDirtyProps,
    initialValues,
  ]);

  const cancelProps = useMemo<Omit<ModalButtonProps, 'children'>>(() => {
    if (typeof cancelButton === 'string') {
      return {
        content: cancelButton,
        ignoreDirty,
        onClick: close,
        submitting,
        variant: ButtonVariant.link,
      };
    }
    return {
      className: cancelButton?.className ?? undefined,
      color: cancelButton?.color ?? undefined,
      content: cancelButton?.content ?? 'Cancel',
      disabled: cancelButton?.disabled ?? undefined,
      ignoreDirty: cancelButton?.ignoreDirty ?? ignoreDirty,
      onClick: cancelButton?.onClick ?? close,
      submitting: cancelButton?.submitting ?? submitting,
      type: cancelButton?.type ?? undefined,
      variant: cancelButton?.variant ?? ButtonVariant.link,
    };
  }, [cancelButton, close, ignoreDirty, submitting]);

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
      className: submitButton?.className ?? undefined,
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
        {displayCancelButton && (
          <FormButton
            className={clsx('Modal__default-cancel', cancelProps.className, {
              ...bemify(className, '__default-cancel'),
            })}
            color={cancelProps.color}
            disabled={cancelProps.disabled}
            ignoreDirty={cancelProps.ignoreDirty}
            onClick={cancelProps.onClick}
            submitting={cancelProps.submitting}
            type={cancelProps.type}
            variant={cancelProps.variant}
          >
            {cancelProps.content}
          </FormButton>
        )}
        {displaySubmitButton && (
          <FormButton
            className={clsx('Modal__default-submit', submitProps.className, {
              ...bemify(className, '__default-submit'),
            })}
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

export default Modal;
