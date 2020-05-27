import React from "react";

/**
 * см тесты в src/utils/withOnChangeValue.test.tsx
 * @param Component
 */
export const withOnChangeValue = <P extends object>(
  Component: React.ComponentType<P>
) => (
  props: P & {
    onChange?: (ev: React.ChangeEvent) => void;
    onChangeValue?: (newText: string) => void;
  }
) => {
  const onChange = (ev: React.ChangeEvent) => {
    if (props.onChange) {
      props.onChange(ev);
    }
    if (props.onChangeValue) {
      props.onChangeValue((ev.target as HTMLInputElement).value);
    }
  };
  return <Component {...props} onChange={onChange} />;
};
