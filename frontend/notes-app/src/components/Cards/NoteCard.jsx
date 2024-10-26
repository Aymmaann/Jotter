import React from "react";
import moment from "moment";
import { MdOutlinePushPin } from "react-icons/md"
import { MdCreate, MdDelete } from "react-icons/md"

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
    return(
        <>
            <div className="border-none rounded p-4 bg-tertiary hover:deeper-shadow smooth-transition text-white">
                <div className="flex items-center justify-between bg-tertiary">
                    <div>
                        <h6 className="text-sm font-medium">{title}</h6>
                        <span className="text-xs text-gray-200">{moment(date).format('Do MMM YYYY')}</span>
                    </div>
                    <MdOutlinePushPin className={`icon-btn ${isPinned? 'text-primary' : 'text-slate-300'}`} onClick={onPinNote} />
                </div>
                <p className="text-xs text-gray-200 mt-2">{content?.slice(0,60)}</p>

                <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-400">{tags.map((item) => `#${item} `)}</div>
                    <div className="flex items-center gap-2">
                        <MdCreate className="icon-btn hover:text-green-600 smooth-transition"
                            onClick={onEdit}
                        />
                        <MdDelete className="icon-btn hover:text-red-600 smooth-transition"
                            onClick={onDelete}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteCard;