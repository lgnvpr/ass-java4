import React, { useEffect } from "react";

type Props = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	label?: string;
    textHelper?: string;
    name ?: string;
};
export default function TextFiled(props: Props) {
    useEffect(() => {
    
    }, [props])
	return (
		<div className="outline-text-filed">
			<label className="label-text-filed">{props.label || ""}</label>
			<input
                name = {(props.name ? props.name : "")}
                value = {(props.value) ? props.value : ""}
				className="c-text-filed"
				type="text"
                onChange={(e) => (props.onChange ? props.onChange(e) : null)}
                onBlur= {(e)=> (props.onBlur ? props.onBlur(e) :null)}
			/>
			<label className="text-helper-text-filed">
				{props.textHelper || ""}
			</label>
		</div>
	);
}
