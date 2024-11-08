import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
    return(
        <div className="mt-28 flex flex-col items-center justify-center">
            <img src={imgSrc} alt="No notes" className="w-60 " />
            <p className="w-1/2 text-md font-medium text-background text-center leading-7 mt-5">{message}</p>
        </div>
    )
}

export default EmptyCard;