import type {ActionFunction} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {z} from "zod";
import {validator} from "~/components/ButtonAdd";
import DataHandler from "~/helpers/DataHandler";
import { DataLine } from "~/helpers/DataHandler";

export const action: ActionFunction = async ({request}) => {
    const result = await validator.validate(
        await request.formData()
    );

    if (result.error){

    }

    // insert data
    let newLine = new DataLine(result.data.type, result.data.text);
    DataHandler.insert(newLine);

    return redirect("/");
};
