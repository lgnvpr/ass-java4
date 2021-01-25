import React, { useEffect } from "react";
import { IconType } from "react-icons";

type Props = {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	label?: string;
	textHelper?: string;
	name?: string;
	leftIcon?: React.ReactElement | IconType;
	rightIcon?: React.ReactElement | IconType;
	type?: "text" | "number" | "password" | "email" | "date";
};
export default function TextFiled(props: Props) {
	useEffect(() => {}, [props]);
	return (
		<div className="outline-text-filed">
			<label className="label-text-filed">{props.label || ""}</label>
			<div className="icon-c-text-filed">{props.leftIcon}</div>
			<input
				name={props.name ? props.name : ""}
				value={props.value ? props.value : ""}
				className="c-text-filed"
				type={props.type || "text"}
				onChange={(e) => (props.onChange ? props.onChange(e) : null)}
				onBlur={(e) => (props.onBlur ? props.onBlur(e) : null)}
			/>
			<div className="icon-c-text-filed">{props.rightIcon}</div>
			<label className="text-helper-text-filed">
				{props.textHelper || ""}
			</label>
		</div>
	);
}
