"use client";

import { TokenContext } from "@/hooks/use-context";
import { useState } from "react";

export default function TokenProvider({ children }) {
    const [token, setToken] = useState(null)
    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    )
}