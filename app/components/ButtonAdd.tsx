import React from 'react';

type ButtonAddProps = {
    visible: boolean;
}

export const ButtonAdd = ({ visible }: ButtonAddProps) => {
    return <>
        <div className={`button-add ${visible ? 'visible' : ''}`}>
            <div className="button-add__btn">
                <div className="button-add__btn__inner">
                    <button className="btn-primary">+</button>
                </div>
            </div>
            <div className="button-add__content">
                <div className="button-add__content__radiolist">
                    <label className="radio"><input type='radio' name='type' checked='checked' value='check'></input><span
                        className="checkmark"><i className="icon-square-check-solid"></i></span></label>
                    <label className="radio"><input type='radio' name='type' value='heading'></input><span
                        className="checkmark"><i className="icon-h2"></i></span></label>
                </div>
                <input type="text" placeholder="Type task or heading"></input>
                <button className="btn-primary">Add <i className="icon-turn-down-left"></i></button>
            </div>
        </div>
    </>
};