import {DataLine} from "~/helpers/DataHandler";
import {ButtonAdd, Type} from "~/components/ButtonAdd";
import React from "react";
import {ButtonRemove} from "~/components/ButtonRemove";

export const BucketListLine = (dataLine: DataLine) => {

    let item = dataLine.dataLine;

    let check_name = "";
    let icon = "";
    if(item.type == Type.Check){
        check_name = 'task[' + item.key + ']';
        icon = item.done ? 'icon-square-check-solid' : 'icon-square-regular';
    }

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    };

    let visible = false;
    return (
        <>
            <ButtonAdd visible={visible} position={item.key} />
            <div className={`bucket-list__line ${item.type == Type.Heading ? 'heading' : ''} ${item.type == Type.Check ? 'check' : ''} ${item.done ? 'done' : ''}`}>
                <div className="bucket-list__line__checkbox">
                    <label className="checkbox">
                        <input type="checkbox" name={check_name}  checked={item.done} onChange={checkHandler}></input>
                        <span className="checkmark"><i className={icon}></i></span>
                    </label>
                </div>
                <div className="bucket-list__line__text">{item.text}</div>
                <ButtonRemove position={item.key} />
            </div>
        </>
    )
};