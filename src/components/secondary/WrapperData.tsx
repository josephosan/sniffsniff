import React, {ReactNode} from "react"

interface DataProps {
    children: ReactNode,
    isMobile?: boolean,
    color?: never,
}


export const WrapperData = ({children, isMobile, color}: DataProps) => {

    return (
        <>
            {
                isMobile ? (
                    <div
                        className=" shadow-sm mb-4 px-5 py-3 bg-white rounded align-items-center "
                        style={{borderRight: `6px solid ${color}`}}
                    >{children}</div>
                ) : (
                    <div
                        className=" shadow-sm mb-4 px-5 py-3 bg-white rounded align-items-center "
                    >{children}</div>
                )
            }
        </>
    )
}
  



