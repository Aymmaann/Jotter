import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
    return(
        <>
            <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 flex items-center justify-center rounded-full font-medium bg-background">
                    {userInfo ? getInitials(userInfo.fullName) : ""}
                </div>

                <div>
                    <p className="text-sm font-medium">{userInfo ? userInfo.fullName : "Loading..."}</p>
                    <button className="text-sm text-gray-200 underline hover:text-white smooth-transition cursor-pointer" onClick={onLogout}>Log out</button>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo;