import Image from 'next/image'
import React from 'react'

function Text({
    setAlignment,
    textSize,
    textColor,
    setTextColor,
    textColorTwo,
    setTextColorTwo,
    handleCapSamTextHandle,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleIncreaseTwo,
    handleDecreaseTwo,
    alignmentTwo,
    setAlignmentTwo,
    textSizeTwo,
    setTextSizeTwo,
}) {

    return (
        <>
            <div className="d-flex justify-content-between w-100">
                <button
                    className="text-alignment"
                    onClick={() => setAlignment('left')}
                >
                    <Image
                        src="/left.webp"
                        width={40}
                        height={40}
                        alt="left align"
                    />
                </button>
                <button
                    className="text-alignment"
                    onClick={() => setAlignment('center')}
                >
                    <Image
                        src="/center.webp"
                        width={40}
                        height={40}
                        alt="center align"
                    />
                </button>
                <button
                    className="text-alignment"
                    onClick={() => setAlignment('right')}
                >
                    <Image
                        src="/right.webp"
                        width={40}
                        height={40}
                        alt="right align"
                    />
                </button>
            </div>
            <div className="my-4 w-100">
                <button onClick={handleDecrease} className="size-btn btn-decrease">-</button>
                <input
                    type="number"
                    value={textSize}
                    onChange={handleInputChange}
                    style={{ width: "60px" }}
                    className="font-size-input w-50"
                />
                <button className="size-btn btn-increase" onClick={handleIncrease}>+</button>
            </div>
            <div className="d-flex justify-content-around">
                <input
                    type="color"
                    name="" id=""
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="text-color-input" />
                <input
                    type="color"
                    name="" id=""
                    value={textColorTwo}
                    onChange={(e) => setTextColorTwo(e.target.value)}
                    className="text-color-input" />
                <button className="size-btn" onClick={handleCapSamTextHandle}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.4668 8.69379L20.7134 8.12811C21.1529 7.11947 21.9445 6.31641 22.9323 5.87708L23.6919 5.53922C24.1027 5.35653 24.1027 4.75881 23.6919 4.57612L22.9748 4.25714C21.9616 3.80651 21.1558 2.97373 20.7238 1.93083L20.4706 1.31953C20.2942 0.893489 19.7058 0.893489 19.5293 1.31953L19.2761 1.93083C18.8442 2.97373 18.0384 3.80651 17.0252 4.25714L16.308 4.57612C15.8973 4.75881 15.8973 5.35653 16.308 5.53922L17.0677 5.87708C18.0555 6.31641 18.8471 7.11947 19.2866 8.12811L19.5331 8.69379C19.7136 9.10792 20.2864 9.10792 20.4668 8.69379ZM2 4C2 3.44772 2.44772 3 3 3H14V5H4V19H20V11H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM7 8H17V11H15V10H13V14H14.5V16H9.5V14H11V10H9V11H7V8Z"></path></svg>
                </button>
            </div>
        </>
    )
}

export default Text