import React from "react";

type Props = {
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	children : string
};
export default function Button(props: Props) {
	return <button className="c-button"
		onClick = {(e)=>{
			if(props.onClick){
				props.onClick(e);
			}
		}}
	>{props.children}</button>;
}
