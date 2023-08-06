import React, { useState, useEffect } from 'react';
import {Form} from '@remix-run/react'
import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { InputText } from "./InputText";
import { SubmitButton } from "./SubmitButton";
import { InputRadio} from "./InputRadio";

type ButtonAddProps = {
    visible: boolean;
}

export enum Type {
    Check = 'check',
    Heading = 'heading'
}

export const validator = withZod(
  z.object({
    text: z
        .string()
        .min(1, { message: "Please enter a task or heading"}),
    type: z
        .string()
        .min(1, { message: "Please select a type"})
  })
);

export const ButtonAdd = ({ visible }: ButtonAddProps) => {
    const [type, setType] = useState(Type.Check);
    const [toggled, setToggled] = useState(false);

    const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value as Type);
    };

    const toggleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setToggled(!toggled);
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setToggled(false);
            }
        }
        window.addEventListener('keydown', handleEsc);
    });

    return <>
        <div className={`button-add ${visible ? 'visible' : ''} ${toggled ? 'toggled' : ''}`}>
            <div className="button-add__btn">
                <div className="button-add__btn__inner">
                    <button className="btn-primary" onClick={toggleHandler}>+</button>
                </div>
            </div>
            <ValidatedForm validator={validator} className="button-add__content" method="POST" action="/add">
                <div className="button-add__content__radiolist">
                    <InputRadio name="type" value={Type.Check} checked={type == Type.Check} onChange={radioHandler} icon="icon-square-check-solid" />
                    <InputRadio name="type" value={Type.Heading} checked={type == Type.Heading} onChange={radioHandler} icon="icon-h2" />
                </div>
                <InputText name="text" placeholder="Type task or heading" />
                <SubmitButton />
            </ValidatedForm>
        </div>
    </>
};