import React from 'react'

type Props = {
    color : string[];
    colorSelected: string;
}
export default function OptionColor(props: Props) {
    return (
        <div style={{
            display: "flex",
        }}>
            {props.color.map(item=>(
                <button className ="btn-color-option"style={{
                    background : item,
                    boxShadow : props.colorSelected==item ? "0 0 5px #333": ""
                }}></button>
            ))}
        </div>
    )
}
