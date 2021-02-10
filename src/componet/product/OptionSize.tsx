import React from 'react'

type Props = {
    sizes : string[];
    sizeSelected: string;
}
export default function OptionSize(props: Props) {
    return (
        <div style={{
            display: "flex",
        }}>
            {props.sizes.map(item=>(
                <button className ="btn-color-option"style={{
                    boxShadow : props.sizeSelected==item ? "0 0 5px #333": "",
                    // border : "1px solid #333",
                    background : "orange"
                }}>{item} </button>
            ))}
        </div>
    )
}
