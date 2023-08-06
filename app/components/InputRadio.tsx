import { useField } from "remix-validated-form";
import React from "react";

type InputRadioProps = {
    name: string;
    value: string;
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon: string;
}

export const InputRadio = ({ name, value, checked, onChange, icon }: InputRadioProps) => {
    const { error } = useField(name);

    return (
        <>
            <label className={`radio ${error ? 'visible' : ''}`}><input type="radio" name={name} value={value} checked={checked} onChange={onChange}></input><span
                className="checkmark"><i className={icon}></i></span></label>
        </>
    );
}