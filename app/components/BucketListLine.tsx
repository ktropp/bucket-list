import {DataLine} from "~/helpers/DataHandler";
import {Type} from "~/components/ButtonAdd";

export const BucketListLine = (dataLine: DataLine) => {

    let item = dataLine.dataLine;

    return (
        <div className={`bucket-list__line ${item.type == Type.Heading ? 'heading' : ''} ${item.type == Type.Check ? 'check' : ''}`}>
            {item.text}
        </div>
    )
};