import { useField } from "remix-validated-form";

type InputTextProps = {
    name: string;
    placeholder: string;
}

export const InputText = ({ name, placeholder }: InputTextProps) => {
    const { error } = useField(name);

    return (
        <>
            <input type="text" name={name} placeholder={placeholder} className={error ? 'error' : ''}></input>
        </>
    );
}