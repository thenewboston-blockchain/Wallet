import styled, {css} from 'styled-components';
import {FormSelect as UFormSelect} from '@renderer/components/FormComponents';
import {
  ButtonType,
  Form as UForm,
  FormButton as UFormButton,
  TextField as UTextField,
} from '@renderer/components/FormElements';
import ULogo from '@renderer/components/Logo';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const Logo = styled(ULogo).attrs(() => ({
  size: 30,
}))``;

export const Subheader = styled.div`
  margin: 30px 0 18px;
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const fieldMixin = css`
  margin: 6px 0;
  width: 360px;
`;

export const FormSelect = styled(UFormSelect)`
  ${fieldMixin};
`;

export const TextField = styled(UTextField)`
  ${fieldMixin};
`;

export const FormButton = styled(UFormButton).attrs(() => ({
  type: ButtonType.submit,
}))`
  margin-top: 30px;
`;
