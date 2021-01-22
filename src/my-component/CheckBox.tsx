import React from "react";

export default function CheckBox() {
	return <div >
        <input className="c-checkbox" type="checkbox" />
        <hr></hr>
        <br/>
        <input type="checkbox" className="switch"/>
        <hr></hr>
        <br/>
        <input  type="radio" name="radio" value="2" checked/>
        <hr></hr>
        <br/>
        <input  type="radio" name="radio" value="1"/>
        <hr></hr>
    </div>
}
