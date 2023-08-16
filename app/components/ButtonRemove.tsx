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
        position: z
            .string()
            .min(0, { message: "Please select a position"})
    })
);

export const ButtonRemove = ({ position }: number) => {

    return <>
        <ValidatedForm validator={validator} method="POST" action="/remove">
            <InputHidden name="position" value={position} />
            <button type="submit" className="bucket-list__line__remove"><i className="icon-circle-xmark"></i></button>
        </ValidatedForm>
    </>
};