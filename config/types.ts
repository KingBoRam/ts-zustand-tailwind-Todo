import {
  Control,
  CriteriaMode,
  DefaultValues,
  FieldValues,
  FormState,
  Mode,
  Resolver,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

// App.tsx
export interface todos {
  id: number;
  text: string;
  checked: boolean;
}

// Posts.tsx
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// App.tsx 아래 두 type은 react-hook-form에서 사용 가능한 메서드의 종류
export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> = Partial<{
  mode: Mode;
  reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
  defaultValues: DefaultValues<TFieldValues>;
  resolver: Resolver<TFieldValues, TContext>;
  context: TContext;
  shouldFocusError: boolean;
  shouldUnregister: boolean;
  shouldUseNativeValidation: boolean;
  criteriaMode: CriteriaMode;
  delayError: number;
}>;

export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> = {
  watch: UseFormWatch<TFieldValues>;
  getValues: UseFormGetValues<TFieldValues>;
  getFieldState: UseFormGetFieldState<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  trigger: UseFormTrigger<TFieldValues>;
  formState: FormState<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;
  reset: UseFormReset<TFieldValues>;
  handleSubmit: UseFormHandleSubmit<TFieldValues>;
  unregister: UseFormUnregister<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  setFocus: UseFormSetFocus<TFieldValues>;
};
