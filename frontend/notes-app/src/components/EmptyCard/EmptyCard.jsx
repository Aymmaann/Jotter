import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
    return(
        <div className="mt-12 flex flex-col items-center justify-center">
            <img src={imgSrc} alt="No notes" className="w-96" />
            <p className="w-1/2 text-md font-medium text-[#f3f1ff] text-center leading-7">{message}</p>
        </div>
    )
}

export default EmptyCard;