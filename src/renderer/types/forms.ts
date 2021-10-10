export type BaseFormComponentProps<T> = Omit<T, 'name' | 'onBlur' | 'onChange' | 'value'> & {
  hideErrorBlock?: boolean;
  hideErrorText?: boolean;
  label?: string;
  name: string;
  required?: boolean;
};

export type BaseFormInlineComponentProps<T> = Omit<T, 'name' | 'onBlur' | 'value'> & {
  label: string;
  name: string;
};

export interface GenericFormValues {
  [fieldName: string]: any;
}

export interface CheckableInputOption {
  disabled?: boolean;
  focused?: boolean;
  label: string;
  value: string;
}

export interface SelectOption {
  disabled?: boolean;
  focused?: boolean;
  value: string;
}

export interface SelectOptionMeta {
  [value: string]: {
    accountNumber?: string;
    nickname?: string;
    amount?: number;
  };
}
