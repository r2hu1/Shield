"use client";

import { TokenContext } from "@/hooks/use-context";
import { useState } from "react";

export default function TokenProvider({ children }) {
    const [token, setToken] = useState(null);
    const [lock, setLock] = useState(true);

    return (
        <TokenContext.Provider value={{ token, setToken, lock, setLock }}>
            {children}
        </TokenContext.Provider>
    )
}