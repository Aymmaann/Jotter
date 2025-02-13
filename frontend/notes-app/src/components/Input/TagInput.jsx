import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("")
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const addNewTag = () => {
        if(inputValue.trim() !== ""){
            setTags([...tags, inputValue.trim()])
            setInputValue("")
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            addNewTag()
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    return(
        <>
            <div>
                {tags?.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="flex items-center gap-2 text-sm text-white bg-blackbg border-[1px] border-zinc-800 px-3 py-1 rounded">#{tag} 
                                <button onClick={() => {handleRemoveTag(tag)}}>
                                    <MdClose className="cursor-pointer smooth-transition hover:text-red-500"/>
                                </button>
                            </span>
                        ))}
                    </div>
                )} 

                <div className="flex items-center gap-4 mt-3">
                    <input type="text"
                        value={inputValue}
                        className="text-sm bg-[#f3f1ff] px-3 py-2 rounded-md outline-none text-background placeholder:text-gray-500"
                        placeholder="Add Tags"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />

                    <button className="cursor-pointer w-8 h-8 flex items-center justify-center rounded border-background smooth-transition bg-tertiary hover:bg-[#7d2ffa]"
                        onClick={() => {addNewTag()}}>
                        <MdAdd className="text-2xl text-white"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default TagInput;