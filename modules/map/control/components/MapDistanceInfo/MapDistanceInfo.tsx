import React from "react"

export const MapDistanceInfo:React.FC<{ distance:string }> = (props) => {
    return (
        <React.Fragment>
            {props.distance && (
                <div className="p-2 rounded-md bg-primary bg-opacity-5">
                    <span className="text-sm text-white">{props.distance}</span>
                </div>
            )}
        </React.Fragment>
    )
}