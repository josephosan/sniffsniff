import React from "react"

interface DataProps{
    data:JSX.Element[],
    isMobile:boolean,
    color: any, 
}


export const WrapperData = ({data ,isMobile , color}:DataProps) => {

    return (
      <>
     {
      data.map((items:JSX.Element) =>{
        {
          return(
          isMobile ? <div  className=" shadow-sm mb-4 px-5 py-3 bg-white rounded align-items-center " style={{borderRight:`6px solid ${color}`}} >{items}</div> 
          : 
          <div  className=" shadow-sm mb-4 px-5 py-3 bg-white rounded align-items-center ">{items}</div>
      )}
        
      })
     }

      </>
    )
  }
  



