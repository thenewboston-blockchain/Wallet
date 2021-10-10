import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import {colors, b1, b2} from '@renderer/styles';

export const Container = styled(FormControl).attrs(() => ({
  fullWidth: true,
}))`
  && {
    background-color: ${colors.white};
    margin-top: 6px;
  }
`;

export const Select = styled(MuiSelect)``;

export const MenuItem = styled(MuiMenuItem)``;

export const Label = styled(InputLabel)`
  && {
    color: ${colors.palette.neutral['400']};
  }
`;

export const OptionEmptyState = styled.div`
  color: ${colors.palette.neutral['500']};
  padding: 16px;
`;

export const DetailedOption = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

export const DetailedOptionAccountSection = styled.div`
  flex: 2;
`;

export const DetailedOptionBalanceSection = styled.div`
  flex: 3;
  text-align: right;
`;

export const DetailedOptionLabel = styled.span<{$defaultValue?: boolean}>`
  ${b2.regular};
  color: ${colors.palette.neutral['500']};
  display: block;
  font-style: ${({$defaultValue}) => $defaultValue && 'italic'};
  margin-bottom: 3px;
`;

export const DetailedOptionValue = styled.div`
  ${b1.regular};
`;
