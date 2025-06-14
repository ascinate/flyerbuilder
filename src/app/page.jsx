'use client'

import Image from "next/image";
import Link from "next/link";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from "react";
import Template from "./component/Template";
import Navbar from "./component/Navbar";
import Text from "./component/Text";
export default function Page() {

  const [alignment, setAlignment] = useState('left');
  const [alignmentTwo, setAlignmentTwo] = useState('left');
  const [textSize, setTextSize] = useState(24);
  const [textSizeTwo, setTextSizeTwo] = useState(24);
  const [textColor, setTextColor] = useState('#000000');
  const [textColorTwo, setTextColorTwo] = useState('#000000')
  const [textTransform, setTextTransform] = useState("none")
  const [textTransformTwo, setTextTransformTwo] = useState("none")
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState('#ffffff');


  


  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  const menuData = [
    [
      {
        label: 'Reset',
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 4C9.25144 4 6.82508 5.38626 5.38443 7.5H8V9.5H2V3.5H4V5.99936C5.82381 3.57166 8.72764 2 12 2C17.5228 2 22 6.47715 22 12H20C20 7.58172 16.4183 4 12 4ZM4 12C4 16.4183 7.58172 20 12 20C14.7486 20 17.1749 18.6137 18.6156 16.5H16V14.5H22V20.5H20V18.0006C18.1762 20.4283 15.2724 22 12 22C6.47715 22 2 17.5228 2 12H4Z"></path>
          </svg>
        ),
      },
      {
        label: 'Undo',
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        ),
      },
      {
        label: 'Redo',
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18.1716 6.99955H11C7.68629 6.99955 5 9.68584 5 12.9996C5 16.3133 7.68629 18.9996 11 18.9996H20V20.9996H11C6.58172 20.9996 3 17.4178 3 12.9996C3 8.58127 6.58172 4.99955 11 4.99955H18.1716L15.636 2.46402L17.0503 1.0498L22 5.99955L17.0503 10.9493L15.636 9.53509L18.1716 6.99955Z"></path>
          </svg>
        ),
      },
      {
        label: 'Delete',
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
          </svg>
        ),
      },
    ],
    [
      {
        label: 'Opacity',
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.5761 14.5764L15.7067 10.707C15.3162 10.3164 14.683 10.3164 14.2925 10.707L6.86484 18.1346C5.11358 16.6671 4 14.4636 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 12.9014 19.8509 13.7679 19.5761 14.5764ZM8.58927 19.2386L14.9996 12.8283L18.6379 16.4666C17.1992 18.6003 14.7613 19.9998 11.9996 19.9998C10.7785 19.9998 9.62345 19.7268 8.58927 19.2386ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM11 10C11 11.1046 10.1046 12 9 12C7.89543 12 7 11.1046 7 10C7 8.89543 7.89543 8 9 8C10.1046 8 11 8.89543 11 10Z"></path></svg>
        ),
      },
      {
        label: 'Layer',
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.0833 15.1999L21.2854 15.9212C21.5221 16.0633 21.5989 16.3704 21.4569 16.6072C21.4146 16.6776 21.3557 16.7365 21.2854 16.7787L12.5144 22.0412C12.1977 22.2313 11.8021 22.2313 11.4854 22.0412L2.71451 16.7787C2.47772 16.6366 2.40093 16.3295 2.54301 16.0927C2.58523 16.0223 2.64413 15.9634 2.71451 15.9212L3.9166 15.1999L11.9999 20.0499L20.0833 15.1999ZM20.0833 10.4999L21.2854 11.2212C21.5221 11.3633 21.5989 11.6704 21.4569 11.9072C21.4146 11.9776 21.3557 12.0365 21.2854 12.0787L11.9999 17.6499L2.71451 12.0787C2.47772 11.9366 2.40093 11.6295 2.54301 11.3927C2.58523 11.3223 2.64413 11.2634 2.71451 11.2212L3.9166 10.4999L11.9999 15.3499L20.0833 10.4999ZM12.5144 1.30864L21.2854 6.5712C21.5221 6.71327 21.5989 7.0204 21.4569 7.25719C21.4146 7.32757 21.3557 7.38647 21.2854 7.42869L11.9999 12.9999L2.71451 7.42869C2.47772 7.28662 2.40093 6.97949 2.54301 6.7427C2.58523 6.67232 2.64413 6.61343 2.71451 6.5712L11.4854 1.30864C11.8021 1.11864 12.1977 1.11864 12.5144 1.30864ZM11.9999 3.33233L5.88723 6.99995L11.9999 10.6676L18.1126 6.99995L11.9999 3.33233Z"></path></svg>
        ),
      },
      {
        label: 'Flip',
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11 2V22H13V2H11ZM7 6V18H4L4 6H7ZM4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H7C8.10457 20 9 19.1046 9 18V6C9 4.89543 8.10457 4 7 4H4ZM15 6C15 4.89543 15.8954 4 17 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H17C15.8954 20 15 19.1046 15 18V6Z"></path></svg>
        ),
      },
      {
        label: 'Duplicate',
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
        ),
      },
    ],
  ];


  const handleIncrease = () => {
    setTextSize(prev => prev + 1);
  };
   const handleIncreaseTwo = () => {
    setTextSizeTwo(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (textSize > 1) {
      setTextSize(prev => prev - 1);
    }
  };
    const handleDecreaseTwo = () => {
    if (textSize > 1) {
      setTextSizeTwo(prev => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) setTextSize(newSize);
  };

  const handleCapSamTextHandle = () => {
    setTextTransform((prev) =>
      prev === "uppercase" ? "lowercase" : "uppercase"
    );
  };

  return (
    <>
      <Navbar />



      <main className=''>
        <section className="section-body">

          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="design-menu d-flex justify-between">
                  {menuData.map((group, index) => (
                    <div key={index} className="design-sub-menu">
                      {group.map((item, idx) => (
                        <button key={idx}>
                          {item.svg}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="design-area">
                  <div className="design-area-canvas d-flex flex-col justify-content-center align-content-center" style={{ background: canvasBackgroundColor, }}>
                    <input
                      className=""
                      style={{ fontSize: `${textSize}px`, textAlign: alignment, color: textColor, textTransform: textTransform, }}
                    />
                    <input type="text"
                      style={{ fontSize: `${textSizeTwo}px`, textAlign: alignmentTwo, color: textColorTwo, textTransform: textTransformTwo, }}
                    />
                  </div>

                </div>
                <div className="design-footer">
                  <button type="button" class="btn  footer-btn">Save progress</button>
                  <button type="button" class="btn btn-primary nav-btn" download>Download</button>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="d-flex align-items-start">
                  <div className="nav flex-column nav-pills me-3 tabs-menu" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20ZM11 5H5V19H11V5ZM19 13H13V19H19V13ZM19 5H13V11H19V5Z"></path></svg>
                      Template
                    </button>
                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>
                      Text
                    </button>
                    <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M15 8V4H5V20H19V8H15ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5ZM17.5 17L13.5 10L8 17H17.5Z"></path></svg>
                      Image
                    </button>
                    <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11.2703 12.2162L15 6L23 21H2L9 8L11.2703 12.2162ZM12.3897 14.2378L14.9873 19H19.6667L14.8976 10.058L12.3897 14.2378ZM5.34843 19H12.6516L9 12.2185L5.34843 19ZM5.5 8C4.11929 8 3 6.88071 3 5.5C3 4.11929 4.11929 3 5.5 3C6.88071 3 8 4.11929 8 5.5C8 6.88071 6.88071 8 5.5 8Z"></path></svg>
                      Background
                    </button>
                  </div>
                  <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                      <Template />
                    </div>
                    <div className="tab-pane  " id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                      <Text
                        alignment={alignment}
                        setAlignment={setAlignment}
                            alignmentTwo={alignmentTwo}
                        setAlignmentTwo={setAlignmentTwo}
                        textSize={textSize}
                        setTextSize={setTextSize}
                           textSizeTwo={textSizeTwo}
                        setTextSizeTwo={setTextSizeTwo}
                        textColor={textColor}
                        setTextColor={setTextColor}
                        textColorTwo={textColorTwo}
                        setTextColorTwo={setTextColorTwo}
                        textTransform={textTransform}
                        setTextTransform={setTextTransform}
                        textTransformTwo={textTransformTwo}
                        setTextTransformTwo={setTextTransformTwo}
                        handleCapSamTextHandle={handleCapSamTextHandle}
                        handleIncrease={handleIncrease}
                        handleDecrease={handleDecrease}
                        handleIncreaseTwo={handleIncreaseTwo}
                        handleDecreaseTwo={handleDecreaseTwo}
                        handleInputChange={handleInputChange}
                      />
                    </div>
                    <div className="tab-pane " id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                      <p>Image</p>
                    </div>
                    <div className="tab-pane " id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                      <input
                        type="color"
                        name="" id=""
                        value={canvasBackgroundColor}
                        onChange={(e) => setCanvasBackgroundColor(e.target.value)}
                        className="text-color-input" />



                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
