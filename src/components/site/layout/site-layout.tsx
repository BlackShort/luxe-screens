import { ReactNode } from "react"
import { Header } from "@/components/site/header/header";

export const SiteLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header variant="sticky" />
            {children}
        </>
    )
}
