import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("");

    const onLogout = () => {
        localStorage.clear()
        navigate("/login")
    }

    const handleSearch = () => {
        if(searchQuery){
            onSearchNote(searchQuery)
        } else {
            handleClearSearch
        }
    }

    const onClearSearch = () => {
        setSearchQuery("")
        handleClearSearch()
    }

    return(
        <>
            <div className="bg-tertiary flex items-center justify-between px-6 py-2 drop-shadow">
                <h2 className="text-2xl font-bold text-white py-2 font-fraunces">Jotter</h2>

                {userInfo && (
                    <SearchBar 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                )}

                {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
            </div>
        </>
    )
}

export default Navbar