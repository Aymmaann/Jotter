import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose, MdEdit } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, onClose, getAllNotes, showToastMessage }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    // Add Note
    const addNewNote = async() => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content, 
                tags
            });
 
            if(response.data && response.data.note) {
                showToastMessage("Note Added Successfully")
                getAllNotes()
                onClose()
            }
        }
        catch(error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
        }
    }

    // Edit Note
    const editNote = async() => {
        const noteId = noteData._id

        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content, 
                tags
            });

            if(response.data && response.data.note) {
                showToastMessage("Note Updated Successfully")
                getAllNotes()
                onClose()
            }
        }
        catch(error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
        }
    }

    const handleAddNote = () => {
        if(!title) {
            setError("Title cannot be empty")
            return
        }
        if(!content) {
            setError("Content cannot be empty")
            return
        }
        setError("")

        if(type === "edit") {
            editNote()
        } else {
            addNewNote()
        }
    }

    return(
        <>
            <div className="relative">
                <button className="text-white w-10 h-10 rounded-full flex items-center justify-center smooth-transition absolute -top-3 -right-3 hover:bg-lightPurple" 
                    onClick={onClose}>
                    <MdClose className="text-xl"/>
                </button>

                <div className="flex flex-col gap-2">
                    <label className="input-label">TITLE</label>
                    <input type="text"
                        className="text-2xl text-background outline-none bg-[#f8f8ff] p-3 rounded-md mt-2 placeholder:text-gray-500"
                        placeholder="Go To Gym At 5"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <label className="input-label">CONTENT</label>
                    <textarea type="text"
                        className="text-sm text-background outline-none bg-[#f8f8ff] p-2 rounded-md placeholder:text-gray-500"
                        placeholder="Content"
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="mt-3">
                    <label className="input-label">TAGS</label>
                    <TagInput tags={tags} setTags={setTags} />
                </div>

                {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

                <button className="btn-primary font-medium mt-5 p-3 smooth-transition cursor-pointer bg-[#f8f8ff] text-background" onClick={handleAddNote}>
                    {type === 'edit'? 'UPDATE' : 'ADD'}
                </button>
            </div>
        </>
    )
}

export default AddEditNotes; 