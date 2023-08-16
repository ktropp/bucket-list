import { useField } from "remix-validated-form";
import React from "react";

type InputHiddenProps = {
    name: string;
    value: string;
}

export const InputHidden = React.forwardRef(({ name, value}: InputHiddenProps, ref) => {
    const { error } = useField(name);

    return (
        <>
            <input type="hidden" name={name} value={value} className={error ? 'error' : ''}></input>
        </>
    );
});