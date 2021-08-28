import styled from 'styled-components';

export const Label = styled.label<{$disabled: boolean}>`
  align-items: center;
  cursor: ${({$disabled}) => ($disabled ? 'default' : 'pointer')};
  display: flex;
`;

export const Text = styled.span`
  margin-left: 8px;
`;
