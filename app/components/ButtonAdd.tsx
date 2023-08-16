import React, { useState, useEffect, useRef } from 'react';
import {Form} from '@remix-run/react'
import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { InputText } from "./InputText";
import { SubmitButton } from "./SubmitButton";
import { InputRadio} from "./InputRadio";
import { InputHidden } from "./InputHidden";

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
        .min(1, { message: "Please select a type"}),
    position: z
        .string()
        .min(0, { message: "Please select a position"})
  })
);

export const ButtonAdd = ({ visible, position }: boolean, number) => {
    const [type, setType] = useState(Type.Check);
    const [toggled, setToggled] = useState(false);
    const ref = useRef(null);
    const wrapperRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value as Type);
        setTimeout(() => {
            ref.current.focus();
        },100);
    };

    const toggleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setToggled(!toggled);
        setTimeout(() => {
            ref.current.focus();
        },100);
    }

    const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setToggled(false);
        setType(Type.Check);
        setInputValue("");
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setToggled(false);
                setType(Type.Check);
                setInputValue("");
            }
        }
        window.addEventListener('keydown', handleEsc);

        const handleClickOutside = (event: Event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setToggled(false);
                setType(Type.Check);
                setInputValue("");
            }
        };
        window.addEventListener('click', handleClickOutside);

        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    });

    return <>
        <div className={`button-add ${visible ? 'visible' : ''} ${toggled ? 'toggled' : ''}`} ref={wrapperRef}>
            <div className="button-add__btn">
                <div className="button-add__btn__inner">
                    <button className="btn-primary" onClick={toggleHandler}>+</button>
                </div>
            </div>
            <ValidatedForm validator={validator} className="button-add__content" method="POST" action="/add" onSubmit={handleSubmit}>
                <InputHidden name="position" value={position} />
                <div className="button-add__content__radiolist">
                    <InputRadio name="type" value={Type.Check} checked={type == Type.Check} onChange={radioHandler} icon="icon-square-check-solid" />
                    <InputRadio name="type" value={Type.Heading} checked={type == Type.Heading} onChange={radioHandler} icon="icon-h2" />
                </div>
                <InputText ref={ref} name="text" placeholder="Type task or heading" value={inputValue} onChange={inputValueHandler} />
                <SubmitButton />
            </ValidatedForm>
        </div>
    </>
};