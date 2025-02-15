import { useState, useRef, useEffect } from "react";
import localforage from "localforage";
import { useFileContext } from "../FileContext";

import '../styles/avatarUpload.css'

function AvatarUpload({ setValue }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    const { setAvatarFile } = useFileContext();

    useEffect(() => {
        localforage.getItem("avatar").then((savedAvatar) => {
            if (savedAvatar) {
            setPreviewUrl(savedAvatar);
            setValue("avatar", savedAvatar);
            }
        });

        localforage.getItem("file").then((savedFile) => {
            if (savedFile) {
            setAvatarFile(savedFile);
            }
        });
    }, [setValue]);

    // Handle drag over (prevents browser from opening the file)
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Handle file drop
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            // Create a local preview URL
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
            setValue("avatar", imageUrl);
            setAvatarFile(file);
            localforage.setItem("avatar", imageUrl);
            localforage.setItem("file", file);
        }
    };

    // Handle click to trigger file dialog
    const handleClick = () => {
        fileInputRef.current.click();
    };

    // Handle file selection from the file dialog
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
            setValue("avatar", imageUrl);
            setAvatarFile(file);
            localforage.setItem("avatar", imageUrl);
        }
    };

    return (
        <>
            <div className="p-6 mb-8 b-dark-green bg-[#052228] rounded-3xl">
                <p className="underline">Upload Profile Photo</p>

                <div className="relative mt-3">
                    <div
                        style={{
                            border: "4px solid rgba(36, 160, 181, 0.5)",
                        }}
                        className={`${previewUrl ? "selected" : ""} image-div z-20 overflow-hidden relative flex justify-center items-center cursor-pointer mx-auto rounded-[32px] sm:h-[240px] h-[200px] w-full max-w-[240px]`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={handleClick}
                    >
                        <div className="overlay p-3 text-center w-44 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <img src="upload_icon.svg" alt="upload icon" className="mx-auto inline-block mb-6" />
                            <p className="underline font-light">Drag & Drop or Click to Upload</p>
                        </div>

                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Uploaded Preview"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                className=" duration-200 hover:brightness-50"
                            />
                        )}

                        <input
                            type="file"
                            name="avatar"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            accept="image/*"
                        />
                    </div>

                    <div className="z-10 bg-[#00000033] absolute left-0 top-[20px] bottom-[20px] right-0 "></div>
                </div>
            </div>
        </>
    )
}

export default AvatarUpload;
