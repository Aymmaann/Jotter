import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProfileInfo from "../../components/Cards/ProfileInfo";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/add-notes.png";
import noDataImg from "../../assets/images/no-data.png";

Modal.setAppElement('#root');

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    })

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "add",
    })

    const [userInfo, setUserInfo] = useState(null)
    const [allNotes, setAllNotes] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const navigate = useNavigate()

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
    }

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type,
        })
    }

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: ""
        })
    }

    // Get User Info
    const getUserInfo = async() => {
        try {
            const response = await axiosInstance.get("/get-user")
            if(response.data && response.data.user) {
                setUserInfo(response.data.user)
            }
        }
        catch(error) {
            if(error.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    // Get All Notes
    const getAllNotes = async() => {
        try {
            const response = await axiosInstance.get("/get-all-notes")

            if(response.data && response.data.notes) {
                setAllNotes(response.data.notes)
            }
        }
        catch(error) {
            console.log("An unexpected error occured. Please try again.");
        }
    }

    const deleteNote = async(data) => { 
        const noteId = data._id

        try {
            const response = await axiosInstance.delete("/delete-note/" + noteId);

            if(response.data && !response.data.error) {
                showToastMessage("Note Deleted Successfully", 'delete')
                getAllNotes()
            }
        }
        catch(error) {
            if(error.response && error.response.data && error.response.data.message) {
                console.log("An unexpected error occured. Please try again."); 
            }
        } 
    }

    const onSearchNote = async(query) => {
        try {
            const response = await axiosInstance.get("/search-notes", {
                params: { query },
            })

            if(response.data && response.data.notes) {
                setIsSearch(true),
                setAllNotes(response.data.notes)
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id

        try {
            const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
                isPinned: !noteData.isPinned, 
            });

            if(response.data && response.data.note) {
                showToastMessage("Note Updated Successfully")
                getAllNotes()
            }  
        }
        catch(error) {
            console.log(error);
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false)
        getAllNotes()
    }

    useEffect(() => {
        getUserInfo()
        getAllNotes()
        return() => {}
    }, [])

    return(
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} getAllNotes={getAllNotes} handleClearSearch={handleClearSearch}/>

            <div>
                <div className="container mx-auto">
                    {allNotes.length > 0? (
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        {allNotes.map((item, index) => (
                            <NoteCard 
                                key={item._id}
                                title={item.title}
                                date={item.createdOn}
                                content={item.content}
                                tags={item.tags} 
                                isPinned={item.isPinned}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => deleteNote(item)}
                                onPinNote={() => updateIsPinned(item)}
                            />
                        ))}
                    </div> 
                    ) : (
                    <EmptyCard imgSrc={isSearch? noDataImg : AddNotesImg} 
                        message={isSearch? 
                            `Oops! No notes found matching your search.` : 
                            `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!`}
                    />
                    )}
                </div>

                <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-lightPurple hover:bg-[#6f6fc8] smooth-transition absolute right-10 bottom-10" 
                    onClick={() => {
                        setOpenAddEditModal({ isShown: true, type: "add", data: null });
                    }}>
                    <MdAdd className="text-[32px] text-white bg-transparent" />
                </button>

                <Modal 
                    isOpen={openAddEditModal.isShown}
                    onRequestClose={() => {}}
                    style={{
                        overlay: {
                            backgroundColor: "rgba(0,0,0,0.2)",
                        },
                    }}
                    contentLabel=""
                    className="w-[40%] max-h-3/4 bg-lightPurple rounded-md mx-auto mt-20 p-5 overflow-scroll"
                >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null })
                    }}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
                </Modal> 

                <Toast
                    isShown={showToastMsg.isShown}
                    message={showToastMsg.message}
                    type={showToastMsg.type}
                    onClose={handleCloseToast}
                />
            </div>
        </>
    )
}

export default Home