import React from "react";
import WrapperScroll from "../../../components/secondary/WrapperScroll";

const Events: React.FC = () => {
    const handleReachedBottom = () => {
        console.log('called');
    }

    return (
        <WrapperScroll
            reachedBottom={handleReachedBottom}
        >
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
            <div className={"w-100 alert alert-danger"}>item</div>
        </WrapperScroll>
    );
}

export default Events;