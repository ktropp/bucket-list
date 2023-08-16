import type {ActionFunction} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {validator} from "~/components/ButtonRemove";
import DataHandler from "~/helpers/DataHandler";

export const action: ActionFunction = async ({request}) => {
    const result = await validator.validate(
        await request.formData()
    );

    if (result.error){

    }

    // insert data
    DataHandler.remove(result.data.position);

    return redirect("/");
};
