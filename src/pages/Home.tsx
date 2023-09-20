import React from "react";

export const Home: React.FC = () => {
    return (
        <>
            <div>
                <div>
                    <div
                        className={"col-sm bg-warning d-flex justify-content-center p-5 align-items-center rounded m-1"}>1
                    </div>
                    <div
                        className={"col-sm bg-success d-flex justify-content-center p-5 align-items-center rounded m-1"}>2
                    </div>
                    <div
                        className={"col-sm bg-info d-flex justify-content-center p-5 align-items-center rounded m-1"}>3
                    </div>
                </div>

                <div>
                    <div
                        className={"col-xl bg-dark d-flex justify-content-center p-5 align-items-center rounded m-1"}>4
                    </div>
                    <div
                        className={"col-xl bg-dark d-flex justify-content-center p-5 align-items-center rounded m-1"}>5
                    </div>
                    <div
                        className={"col-xl bg-dark d-flex justify-content-center p-5 align-items-center rounded m-1"}>6
                    </div>
                </div>
            </div>
        </>
    );
}