import { createContext, useContext, useState, useEffect } from "react";
import localforage from "localforage";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [avatarFile, setAvatarFile] = useState(null);

    // Load saved file on mount
    useEffect(() => {
        localforage.getItem("file").then((savedFile) => {
            if (savedFile) {
                setAvatarFile(savedFile);
            }
        });
    }, []);

    // Save file when it changes
    useEffect(() => {
        if (avatarFile) {
            localforage.setItem("file", avatarFile);
        }
    }, [avatarFile]);

    return (
        <FileContext.Provider value={{ avatarFile, setAvatarFile }}>
            {children}
        </FileContext.Provider>
    );
};


export const useFileContext = () => useContext(FileContext);
