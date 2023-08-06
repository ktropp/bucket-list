import DataHandler from "~/helpers/DataHandler";
import {BucketListLine} from "~/components/BucketListLine";
import {useLoaderData} from "@remix-run/react";
import {json} from "@remix-run/node";



export const BucketList = () => {

    const listItems = useLoaderData<typeof loader>();

    return (
        <div className="bucket-list">
            {listItems.map((dataLine) => (
                <BucketListLine key={dataLine.key} dataLine={dataLine} />
            ))}
        </div>
    )
}