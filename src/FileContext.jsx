import { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [avatarFile, setAvatarFile] = useState(null);

    return (
        <FileContext.Provider value={{ avatarFile, setAvatarFile }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => useContext(FileContext);
