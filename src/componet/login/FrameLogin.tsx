import React from 'react'

type  Props ={
    children : React.ReactElement,
    title: string
}
export default function FrameLogin(props : Props) {
    return (
        <div className="page">
			<div className="page-login">
				<div className="fr-login">
					<div className="title-login">
						<h1>{props.title}</h1>
					</div>
					{props.children}
				</div>
			</div>
		</div>
    )
}
