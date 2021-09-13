import styled from 'styled-components';
import {RadioGroup as URadioGroup, TextField as UTextField} from '@renderer/components/FormElements';

export const Container = styled.div`
  min-height: 250px;
`;

export const RadioGroup = styled(URadioGroup)`
  && {
    margin-bottom: 12px;
  }
`;

export const TextField = styled(UTextField)`
  && {
    margin-bottom: 6px;
  }
`;
