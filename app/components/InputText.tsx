import { useField } from "remix-validated-form";
import React from "react";

type InputTextProps = {
    name: string;
    placeholder: string;
    value: string;
}

export const InputText = React.forwardRef(({ name, placeholder, value, onChange}: InputTextProps, ref) => {
    const { error } = useField(name);

    return (
        <>
            <input type="text" name={name} placeholder={placeholder} ref={ref} className={error ? 'error' : ''} value={value} onChange={onChange}></input>
        </>
    );
});