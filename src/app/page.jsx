'use client'

import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from "react";

//component
import Template from "./component/Template";
import Navbar from "./component/Navbar";

//npm package
import * as htmlToImage from 'html-to-image';
import { Rnd } from "react-rnd";
import { jsPDF } from "jspdf";




export default function Page() {

  const designRef = useRef(null);
  const [format, setFormat] = useState('jpg');

  const handleDownload = async () => {
    if (!designRef.current) return;

    if (format === "jpg") {
      const dataUrl = await htmlToImage.toJpeg(designRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "design.jpg";
      link.href = dataUrl;
      link.click();
    } else if (format === "psd" || format === "ai") {
      const dataUrl = await htmlToImage.toJpeg(designRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      const blob = await (await fetch(dataUrl)).blob();
      const renamedFile = new File([blob], `design.${format}`, {
        type: "image/jpeg",
      });
      const url = URL.createObjectURL(renamedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = `design.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === "pdf") {

      const dataUrl = await htmlToImage.toPng(designRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      const elementWidth = designRef.current.scrollWidth;
      const elementHeight = designRef.current.scrollHeight;

      const pdf = new jsPDF({
        orientation: elementWidth > elementHeight ? "l" : "p",
        unit: "px",
        format: [elementWidth, elementHeight],
      });

      pdf.addImage(dataUrl, "PNG", 0, 0, elementWidth, elementHeight);
      pdf.save("design.pdf");
    }
  };


  const [textStyles, setTextStyles] = useState({
    input1: {
      alignment: 'left',
      text: "pritam",
      textSize: 16,
      // textColor: '#000000',
      // textColorTwo: '#000000',
      textTransform: 'none',
      canvasBackgroundColor: '#ffffff',
      fontFamily: ' Calibri',
      fontWeight: 'normal',
      fontStyle: 'normal',
      letterSpacing: 0,
    },
    // input2: {
    //   alignment: 'left',
    //   textSize: 16,
    //   textColor: '#000000',
    //   textColorTwo: '#000000',
    //   textTransform: 'none',
    //   canvasBackgroundColor: '#ffffff'
    // },

  });


  // *******************************************


  const [textColor, setTextColor] = useState("#000000");

  const editorRefs = useRef({});

  const applyColorToSelectedText = (color) => {
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, color);
  };



  const handleColorChange = (e) => {
    const color = e.target.value;
    setTextColor(color);
    applyColorToSelectedText(color);
  };

  const handleContentChange = (id) => {
    const html = editorRefs.current[id]?.innerHTML;
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, content: html } : el))
    );
  };

  const addTextElement = () => {
    const newId = Date.now();
    setElements((prev) => [
      ...prev,
      {
        id: newId,
        type: "text",
        content: "New Text",
        x: 150,
        y: 150,
        width: 200,
        height: 100,
      },
    ]);
  };

  const addImageElement = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const newId = Date.now();
      setElements((prev) => [
        ...prev,
        {
          id: newId,
          type: "image",
          src: ev.target.result,
          x: 200,
          y: 200,
          width: 300,
          height: 200,
        },
      ]);
    };
    reader.readAsDataURL(file);
  };

  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };



  // *******************************************






  // const [images, setImages] = useState([
  //   {
  //     id: 1,
  //     src: "/pngImg.png",
  //     width: 80,
  //     height: 50,
  //   },
  //   {
  //     id: 2,
  //     src: "/pngImg.png",
  //     width: 100,
  //     height: 50,
  //   },
  // ]);

  const [history, setHistory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [redoHistory, setRedoHistory] = useState([]);

  const saveToHistory = () => {
    setHistory((prev) => [
      ...prev,
      {
        elements: JSON.parse(JSON.stringify(elements)),
        textStyles: JSON.parse(JSON.stringify(textStyles)),
      },
    ]);
    setRedoHistory([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setRedoHistory((prev) => [
      ...prev,
      {
        elements: JSON.parse(JSON.stringify(elements)),
        textStyles: JSON.parse(JSON.stringify(textStyles)),
      },
    ]);
    setElements(last.elements);
    setTextStyles(last.textStyles);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoHistory.length === 0) return;
    const next = redoHistory[redoHistory.length - 1];
    setHistory((prev) => [
      ...prev,
      {
        elements: JSON.parse(JSON.stringify(elements)),
        textStyles: JSON.parse(JSON.stringify(textStyles)),
      },
    ]);
    setElements(next.elements);
    setTextStyles(next.textStyles);
    setRedoHistory((prev) => prev.slice(0, -1));
  };






  const handleUpload = (e) => {
    saveToHistory();
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newImage = {
        id: Date.now(),
        src: reader.result,
        width: 100,
        height: 60,
      };
      // setImages((prev) => [...prev, newImage]);
    };
    reader.readAsDataURL(file);
  };

  const deleteImage = (id) => {
    // setImages((prev) => prev.filter((img) => img.id !== id));
  };
  const deleteAllElements = () => {
    if (elements.length === 0) return;
    const confirmDelete = window.confirm("Are you sure you want to delete all elements?");
    if (!confirmDelete) return;
    saveToHistory();
    setElements([]);
    setSelectedId(null);
  };

  const [uploadedImage, setUploadedImage] = useState(null);
  const [upoloadPngImage, setUploadedPngImage] = useState(null);



  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  const handleBringFont = (elementId) => {
    const maxZ = Math.max(...elements.map(el => el.zIndex || 1));
    setElements(elements.map(el =>
      el.id === elementId ? { ...el, zIndex: maxZ + 1 } : el
    ));
  };

  const handleSendBack = (elementId) => {
    const minZ = Math.min(...elements.map(el => el.zIndex || 1));
    setElements(elements.map(el =>
      el.id === elementId ? { ...el, zIndex: minZ - 1 } : el
    ));
  };

  const handleFlipHorizontally = () => {
    if (!selectedId) return;

    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedId
          ? { ...el, flipHorizontal: !el.flipHorizontal }
          : el
      )
    );
  };

  const handleFlipVertically = () => {
    if (!selectedId) return;

    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedId
          ? { ...el, flipVertical: !el.flipVertical }
          : el
      )
    );
  };



  const handleDuplicate = () => {
    if (!selectedId) return;

    const elementToDuplicate = elements.find(el => el.id === selectedId);
    if (!elementToDuplicate) return;

    const duplicatedElement = {
      ...elementToDuplicate,
      id: Date.now(),
      x: elementToDuplicate.x + 20,
      y: elementToDuplicate.y + 20,
      zIndex: Math.max(...elements.map(el => el.zIndex)) + 1,
    };


    setElements(prevElements => [...prevElements, duplicatedElement]);
  };


  const handleOpacityChange = (id, value) => {
    const opacity = Math.min(Math.max(value, 0), 1); // Ensure range 0–1
    setElements((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, opacity } : el
      )
    );
  };


  const [elements, setElements] = useState([
    {
      id: 1,
      type: "text",
      content: "Edit me!",
      x: 100,
      y: 100,
      width: 180,
      height: 80,
      zIndex: 1,
      flipHorizontal: false,
      flipVertical: false,
      opacity: 1,

    },
    {
      id: 2,
      type: "image",
      src: "/one.png",
      x: 300,
      y: 150,
      width: 200,
      height: 150,
      zIndex: 2,
      flipHorizontal: false,
      flipVertical: false,
      opacity: 1,
    },
    {
      id: 3,
      type: "image",
      src: "/two.png",
      x: 50,
      y: 2,
      width: 150,
      height: 100,
      zIndex: 3,
      flipHorizontal: false,
      flipVertical: false,
      opacity: 1,
    },
    {
      id: 4,
      type: "image",
      src: "/three.png",
      x: 450,
      y: 20,
      width: 150,
      height: 100,
      zIndex: 4,
      flipHorizontal: false,
      flipVertical: false,
      opacity: 1,
    },
  ]);



  // const handleTextChange = (id, newText) => {
  //   saveToHistory();
  //   setElements((prev) =>
  //     prev.map((el) => (el.id === id ? { ...el, content: newText } : el))
  //   );
  // };

  const initialElementsRef = useRef(null);
  const initialTextStylesRef = useRef(null);

  useEffect(() => {
    if (!initialElementsRef.current) {
      initialElementsRef.current = elements;
      initialTextStylesRef.current = textStyles;
    }
  }, [elements, textStyles]);

  const handleReset = () => {
    if (initialElementsRef.current && initialTextStylesRef.current) {
      setElements(initialElementsRef.current);
      setTextStyles(initialTextStylesRef.current);
    }
  };

  // drag ans drop
  const menuData = [
    [
      {
        label: <button onClick={handleReset}>Reset</button>,
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 4C9.25144 4 6.82508 5.38626 5.38443 7.5H8V9.5H2V3.5H4V5.99936C5.82381 3.57166 8.72764 2 12 2C17.5228 2 22 6.47715 22 12H20C20 7.58172 16.4183 4 12 4ZM4 12C4 16.4183 7.58172 20 12 20C14.7486 20 17.1749 18.6137 18.6156 16.5H16V14.5H22V20.5H20V18.0006C18.1762 20.4283 15.2724 22 12 22C6.47715 22 2 17.5228 2 12H4Z"></path>
          </svg>
        ),
      },
      {
        label: <button onClick={handleUndo}>Undo</button>,
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        ),
      },
      {
        label: <button onClick={handleRedo}>Redo</button>,
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18.1716 6.99955H11C7.68629 6.99955 5 9.68584 5 12.9996C5 16.3133 7.68629 18.9996 11 18.9996H20V20.9996H11C6.58172 20.9996 3 17.4178 3 12.9996C3 8.58127 6.58172 4.99955 11 4.99955H18.1716L15.636 2.46402L17.0503 1.0498L22 5.99955L17.0503 10.9493L15.636 9.53509L18.1716 6.99955Z"></path>
          </svg>
        ),
      },
      {
        label: <button onClick={deleteAllElements}>Delete</button>,
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
          </svg>
        ),
      },
    ],
    [
      {
        label:
          <div className="opacity-btn">
            <button className="handleLayer">Opacity</button>
            <div className="layer-two-btn">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={elements.find((el) => el.id === selectedId)?.opacity || 1}
                onChange={(e) =>
                  handleOpacityChange(selectedId, parseFloat(e.target.value))
                }
              />
              <input
                type="text"
                value={elements.find((el) => el.id === selectedId)?.opacity || 1}
                onChange={(e) =>
                  handleOpacityChange(selectedId, parseFloat(e.target.value))
                }
                className="opacity-level"
              />
            </div>
          </div>
        ,
        svg: (
          <svg width="18" height="18" viewBox="0 0 112 106" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 7C0 3.134 3.13401 0 7 0H105C108.866 0 112 3.13401 112 7V99C112 102.866 108.866 106 105 106H7C3.13401 106 0 102.866 0 99V7Z" fill="#AEAEAE" />
            <path d="M46 0H56V5H46V0Z" fill="white" />
            <path d="M46 101H56V106H46V101Z" fill="#474646" />
            <path d="M46 8H56V18H46V8Z" fill="#474646" />
            <path d="M86 8H96V18H86V8Z" fill="#474646" />
            <path d="M112 98H102V88H112V98Z" fill="#474646" />
            <path d="M61 8H71V18H61V8Z" fill="#474646" />
            <path d="M71 98H81V88H71V98Z" fill="#474646" />
            <path d="M71 74H81V64H71V74Z" fill="#474646" />
            <path d="M46 31H56V41H46V31Z" fill="#474646" />
            <path d="M86 31H96V41H86V31Z" fill="#474646" />
            <path d="M112 62H102V52H112V62Z" fill="white" />
            <path d="M112 72H102V62H112V72Z" fill="#474646" />
            <path d="M61 31H71V41H61V31Z" fill="#474646" />
            <path d="M71 51H81V41H71V51Z" fill="#474646" />
            <path d="M46 78H56V88H46V78Z" fill="#474646" />
            <path d="M46 54H56V64H46V54Z" fill="#474646" />
            <path d="M86 78H96V88H86V78Z" fill="#474646" />
            <path d="M86 54H96V64H86V54Z" fill="#474646" />
            <path d="M86 101H96V106H86V101Z" fill="white" />
            <path d="M102 101H112V101C112 103.761 109.761 106 107 106H102V101Z" fill="white" />
            <path d="M102 7V0H105C108.866 0 112 3.13401 112 7V7H102Z" fill="#474646" />
            <path d="M112 29H102V19H112V29Z" fill="#474646" />
            <path d="M61 78H71V88H61V78Z" fill="#474646" />
            <path d="M61 54H71V64H61V54Z" fill="#474646" />
            <path d="M71 28H81V18H71V28Z" fill="#474646" />
            <path d="M71 5H81V0H71V5Z" fill="#474646" />
            <path d="M71 106H81V101H71V106Z" fill="#474646" />
            <path d="M46 18H56V28H46V18Z" fill="white" />
            <path d="M86 18H96V28H86V18Z" fill="white" />
            <path d="M112 88H102V78H112V88Z" fill="white" />
            <path d="M61 18H71V28H61V18Z" fill="white" />
            <path d="M61 0H71V5H61V0Z" fill="white" />
            <path d="M61 101H71V106H61V101Z" fill="white" />
            <path d="M71 88H81V78H71V88Z" fill="white" />
            <path d="M71 64H81V54H71V64Z" fill="white" />
            <path d="M46 41H56V51H46V41Z" fill="white" />
            <path d="M86 41H96V51H86V41Z" fill="white" />
            <path d="M112 45H102V35H112V45Z" fill="white" />
            <path d="M61 41H71V51H61V41Z" fill="white" />
            <path d="M71 41H81V31H71V41Z" fill="white" />
            <path d="M46 88H56V98H46V88Z" fill="white" />
            <path d="M46 64H56V74H46V64Z" fill="white" />
            <path d="M86 88H96V98H86V88Z" fill="white" />
            <path d="M86 64H96V74H86V64Z" fill="white" />
            <path d="M112 19H102V9H112V19Z" fill="white" />
            <path d="M96 5H86V0H96V5Z" fill="white" />
            <path d="M61 88H71V98H61V88Z" fill="white" />
            <path d="M61 64H71V74H61V64Z" fill="white" />
            <path d="M0 7C0 3.134 3.13401 0 7 0H47V106H7C3.13401 106 0 102.866 0 99V7Z" fill="#474646" />
            <path d="M71 18H81V8H71V18Z" fill="white" />
          </svg>


        ),
      },
      {
        label:
          <div className="layer-btn">
            <button className="handleLayer">Layer</button>
            <div className="layer-two-btn">
              <button className="d-flex align-items-center justify-content-center" onClick={() => handleBringFont(selectedId)}>
                <svg width="18" height="18" viewBox="0 0 118 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.2722 81.7364L116.846 41.188C117.987 40.3701 117.953 38.6618 116.779 37.8909L60.2053 0.721549C59.5387 0.283571 58.6756 0.283573 58.0089 0.721551L1.43501 37.8909C0.261643 38.6618 0.226975 40.3701 1.3681 41.188L57.942 81.7364C58.6385 82.2356 59.5757 82.2356 60.2722 81.7364Z" fill="black" />
                  <path d="M107.462 59.9217C109.912 58.1259 113.354 58.6554 115.15 61.1052C116.946 63.555 116.415 66.9969 113.965 68.7927L59.318 108.85L6.01425 68.7527L5.79257 68.5769C3.5587 66.7123 3.15636 63.4022 4.92538 61.0506C6.69443 58.699 9.98619 58.1682 12.3971 59.7976L12.6275 59.9617L59.4019 95.1492L107.462 59.9217Z" fill="black" />
                </svg>
                Bring to Front
              </button>
              <button className="d-flex align-items-center justify-content-center" onClick={() => handleSendBack(selectedId)}>
                <svg width="18" height="18" viewBox="0 0 127 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M59.743 1.83105C61.8792 0.538506 64.5769 0.582157 66.6756 1.96093L123.25 39.1299C127.063 41.6353 127.176 47.1876 123.468 49.8457L66.8934 90.3935C64.6297 92.016 61.5838 92.016 59.3201 90.3935L2.74689 49.8457C-0.961729 47.1876 -0.849662 41.6354 2.96369 39.1299L59.5379 1.96093L59.743 1.83105ZM10.949 44.6514L63.1063 82.0342L115.264 44.6514L63.1063 10.3838L10.949 44.6514Z" fill="black" />
                  <path d="M62.1858 110.55L9.19555 70.4635C8.62675 70.0332 8.67835 69.1629 9.29401 68.8028L23.4299 60.5354C23.7759 60.3331 24.2092 60.3569 24.5309 60.5958L62.1847 88.557C62.5389 88.82 63.0236 88.8198 63.3776 88.5565L100.991 60.5804C101.302 60.3493 101.718 60.3183 102.06 60.5009L117.604 68.8125C118.252 69.1591 118.317 70.0631 117.725 70.4992L63.3824 110.557C63.0259 110.82 62.539 110.817 62.1858 110.55Z" fill="black" />
                  <path d="M98.6332 56.7438C100.188 55.7527 102.14 55.6078 103.825 56.358L104.182 56.5328L119.725 64.8444C123.29 66.7507 123.65 71.7228 120.396 74.1217L66.0522 114.179C64.1528 115.579 61.5807 115.607 59.6557 114.272L59.4711 114.138L6.48087 74.0524C3.35257 71.6859 3.63612 66.8991 7.02189 64.9186L21.1586 56.651L21.3383 56.5504C23.1492 55.5801 25.3524 55.7004 27.0463 56.8629L27.2143 56.983L62.7787 83.3932L98.3061 56.9694L98.6332 56.7438ZM66.0629 92.1676C64.1159 93.6155 61.4504 93.616 59.5024 92.1696H59.5014L23.7045 65.5866L16.0932 70.0387L62.8158 105.383L110.591 70.1657L101.895 65.5153L66.0629 92.1676Z" fill="black" />
                </svg>
                Send to Back
              </button>

            </div>
          </div>,
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.0833 15.1999L21.2854 15.9212C21.5221 16.0633 21.5989 16.3704 21.4569 16.6072C21.4146 16.6776 21.3557 16.7365 21.2854 16.7787L12.5144 22.0412C12.1977 22.2313 11.8021 22.2313 11.4854 22.0412L2.71451 16.7787C2.47772 16.6366 2.40093 16.3295 2.54301 16.0927C2.58523 16.0223 2.64413 15.9634 2.71451 15.9212L3.9166 15.1999L11.9999 20.0499L20.0833 15.1999ZM20.0833 10.4999L21.2854 11.2212C21.5221 11.3633 21.5989 11.6704 21.4569 11.9072C21.4146 11.9776 21.3557 12.0365 21.2854 12.0787L11.9999 17.6499L2.71451 12.0787C2.47772 11.9366 2.40093 11.6295 2.54301 11.3927C2.58523 11.3223 2.64413 11.2634 2.71451 11.2212L3.9166 10.4999L11.9999 15.3499L20.0833 10.4999ZM12.5144 1.30864L21.2854 6.5712C21.5221 6.71327 21.5989 7.0204 21.4569 7.25719C21.4146 7.32757 21.3557 7.38647 21.2854 7.42869L11.9999 12.9999L2.71451 7.42869C2.47772 7.28662 2.40093 6.97949 2.54301 6.7427C2.58523 6.67232 2.64413 6.61343 2.71451 6.5712L11.4854 1.30864C11.8021 1.11864 12.1977 1.11864 12.5144 1.30864ZM11.9999 3.33233L5.88723 6.99995L11.9999 10.6676L18.1126 6.99995L11.9999 3.33233Z"></path></svg>
        ),
      },
      {
        label:
          <div className="layer-btn">
            <button className="handleLayer">Flip</button>
            <div className="layer-two-btn">
              <button onClick={handleFlipHorizontally} className="d-flex align-items-center justify-content-center" >
                <svg width="18" height="18" viewBox="0 0 154 121" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M72.5 2.5V120.5H0.823242L64.9736 0.613281L72.5 2.5ZM14.1768 112.5H64.5V18.4521L14.1768 112.5Z" fill="black" />
                  <path d="M86 116V2L147 116H86Z" fill="black" />
                  <path d="M82 2V120H153.677L89.5264 0.113281L82 2ZM140.323 112H90V17.9521L140.323 112Z" fill="black" />
                </svg>
                Flip Horizontally
              </button>
              <button onClick={handleFlipVertically} className="d-flex align-items-center justify-content-center" >
                <svg width="18" height="18" viewBox="0 0 121 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.44336 82.0566L120.443 82.0566L120.443 153.733L0.556638 89.583L2.44336 82.0566ZM112.443 140.38L112.443 90.0566L18.3955 90.0566L112.443 140.38Z" fill="black" />
                  <path d="M115.943 68.5566L1.94336 68.5566L115.943 7.55664L115.943 68.5566Z" fill="black" />
                  <path d="M1.94336 72.5566L119.943 72.5566L119.943 0.879878L0.0566434 65.0303L1.94336 72.5566ZM111.943 14.2334L111.943 64.5566L17.8955 64.5566L111.943 14.2334Z" fill="black" />
                </svg>
                Flip Vertically
              </button>
            </div>
          </div>,
        svg: (
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11 2V22H13V2H11ZM7 6V18H4L4 6H7ZM4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H7C8.10457 20 9 19.1046 9 18V6C9 4.89543 8.10457 4 7 4H4ZM15 6C15 4.89543 15.8954 4 17 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H17C15.8954 20 15 19.1046 15 18V6Z"></path></svg>
        ),
      },
      {
        label: <button className="" onClick={handleDuplicate}>Duplicate</button>,
        svg: (
          <svg width="18" height="18" viewBox="0 0 112 113" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40.5 105H104V27H40.5V105ZM112 108C112 110.761 109.761 113 107 113H37.5C34.8247 113 32.6405 110.899 32.5068 108.257L32.5 108V24C32.5 21.2386 34.7386 19 37.5 19H107C109.761 19 112 21.2386 112 24V108Z" fill="black" />
            <path d="M80 12.5C80 14.7091 78.2091 16.5 76 16.5C73.7909 16.5 72 14.7091 72 12.5V8H8V85H25.5C27.7091 85 29.5 86.7909 29.5 89C29.5 91.2091 27.7091 93 25.5 93H5C2.23858 93 0 90.7614 0 88V5C2.64876e-08 2.23857 2.23858 2.57702e-07 5 0H75C77.7614 4.02673e-09 80 2.23858 80 5V12.5Z" fill="black" />
          </svg>
        ),
      },
    ],
  ];



  const handleIncrease = (inputKey = 'input1') => {
    saveToHistory();
    setTextStyles((prev) => ({
      ...prev,
      [inputKey]: {
        ...prev[inputKey],
        textSize: prev[inputKey].textSize + 1,
      },
    }));
  };

  const handleDecrease = (inputKey = 'input1') => {
    saveToHistory();
    if (textStyles[inputKey].textSize > 1) {
      setTextStyles((prev) => ({
        ...prev,
        [inputKey]: {
          ...prev[inputKey],
          textSize: prev[inputKey].textSize - 1,
        },
      }));
    }
  };

  const handleInputChange = (e, inputKey = 'input1') => {
    saveToHistory();
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) {
      setTextStyles((prev) => ({
        ...prev,
        [inputKey]: {
          ...prev[inputKey],
          textSize: newSize,
        },
      }));
    }
  };
  const handleCapSamTextHandle = (inputKey = 'input1') => {
    saveToHistory();
    setTextStyles((prev) => ({
      ...prev,
      [inputKey]: {
        ...prev[inputKey],
        textTransform:
          prev[inputKey].textTransform === 'uppercase'
            ? 'lowercase'
            : 'uppercase',
      },
    }));
  };
  const updateTextStyle = (inputKey, key, value) => {
    setTextStyles((prev) => ({
      ...prev,
      [inputKey]: {
        ...prev[inputKey],
        [key]: value,
      },
    }));
  };


  const handleRemoveImage = () => {
    saveToHistory();
    setUploadedImage(null);
  };



  const handleImageUpload = (e) => {
    saveToHistory();
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };


  const handlePngImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedPngImage(imageUrl);
    }
  }
  // drag ans drop



  // background image color
  const updateInput1Style = (property, value) => {
    saveToHistory();
    setTextStyles((prev) => ({
      ...prev,
      input1: {
        ...prev.input1,
        [property]: value,
      },
    }));
  };


  //font-style
  const fontOptions = [
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Verdana", value: "Verdana, sans-serif" },
    { label: "Tahoma", value: "Tahoma, sans-serif" },
    { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Garamond", value: "Garamond, serif" },
    { label: "Courier New", value: "'Courier New', monospace" },
    { label: "Impact", value: "Impact, sans-serif" },
    { label: "Comic Sans MS", value: "'Comic Sans MS', cursive" },
    { label: "Lucida Sans", value: "'Lucida Sans', sans-serif" },
    { label: "Helvetica", value: "Helvetica, Arial, sans-serif" },
    { label: "Palatino", value: "Palatino, 'Palatino Linotype', serif" },
    { label: "Book Antiqua", value: "'Book Antiqua', Palatino, serif" },
    { label: "Franklin Gothic Medium", value: "'Franklin Gothic Medium', Arial, sans-serif" },
    { label: "Gill Sans", value: "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif" },
    { label: "Cambria", value: "Cambria, Georgia, Times, 'Times New Roman', serif" },
    { label: "Century Gothic", value: "'Century Gothic', Futura, Arial, sans-serif" },
    { label: "Rockwell", value: "Rockwell, 'Courier New', Courier, monospace" },
    { label: "Baskerville", value: "Baskerville, 'Baskerville Old Face', Georgia, serif" },
  ];

  return (
    <>
      <Navbar />
      <main className=''>
        <section className="section-body">

          <div className="">
            <div className="row m-0 p-0">
              <div className="col-lg-8">
                <div className="design-menu d-flex justify-between" >
                  {menuData.map((group, index) => (
                    <div key={index} className="design-sub-menu">
                      {group.map((item, idx) => (
                        <button key={idx} className="sub-navbar">
                          {item.svg}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="design-area">
                  <div className="design-area-canvas d-flex flex-col justify-content-center align-content-center" style={{ backgroundColor: textStyles.input1.canvasBackgroundColor }} ref={designRef}>
                    {/* <input
                      style={{
                        fontSize: `${textStyles.input1.textSize}px`,
                        textAlign: textStyles.input1.alignment,
                        color: textStyles.input1.textColor,
                        textTransform: textStyles.input1.textTransform,
                      }}
                      className="canavas_input"
                      value={textStyles.input1.text}
                    />
                    <input
                      type="text"
                      style={{
                        fontSize: `${textStyles.input2.textSize}px`,
                        textAlign: textStyles.input2.alignment,
                        color: textStyles.input2.textColorTwo,
                      }}
                      className="canavas_input"
                    /> */}

                    <div className="uploadedImage" >
                      {uploadedImage && (
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="uploaded-image"
                        />
                      )}
                    </div>


                    <div className="main-image-list">
                      {/* {images.map((img) => (
                        <div key={img.id} className="image-box">
                          <Image src={img.src} width={img.width} height={img.height} alt="MainImage" />
                        </div>
                      ))} */}
                    </div>

                    {/* Drag and drop */}


                    <div
                      className="editor-canvas"
                      style={{
                        width: "100%",
                        height: "90vh",
                        position: "relative",
                      }}
                      onClick={(e) => {
                        // Deselect if clicked on canvas
                        if (
                          e.target &&
                          e.target.classList &&
                          e.target.classList.contains("editor-canvas")
                        ) {
                          setSelectedId(null);
                        }
                      }}
                    >
                      {elements.map((el) => (
                        <Rnd
                          key={el.id}
                          size={{ width: el.width, height: el.height }}
                          position={{ x: el.x, y: el.y }}
                          onDragStop={(e, d) => {
                            setElements((prev) =>
                              prev.map((item) =>
                                item.id === el.id ? { ...item, x: d.x, y: d.y } : item
                              )
                            );
                          }}
                          onResizeStop={(e, direction, ref, delta, position) => {
                            setElements((prev) =>
                              prev.map((item) =>
                                item.id === el.id
                                  ? {
                                    ...item,
                                    width: parseInt(ref.style.width),
                                    height: parseInt(ref.style.height),
                                    ...position,
                                  }
                                  : item
                              )
                            );
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(el.id);
                          }}
                          bounds="parent"
                          style={{
                            border: selectedId === el.id ? "1px dashed #333" : "none",
                            padding: "4px",
                            zIndex: el.zIndex
                          }}
                        >
                          <div
                            style={{ width: "100%", height: "100%", position: "relative" }}
                          >
                            {el.type === "text" ? (
                              // i replase textarea here
                              <div
                                ref={(ref) => (editorRefs.current[el.id] = ref)}
                                contentEditable
                                suppressContentEditableWarning={true}
                                dangerouslySetInnerHTML={{ __html: el.content }}
                                onInput={() => handleContentChange(el.id)}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  fontSize: `${textStyles.input1.textSize}px`,
                                  textAlign: textStyles.input1.alignment,
                                  fontFamily: textStyles.input1.fontFamily,
                                  textTransform: textStyles.input1.textTransform,
                                  letterSpacing: `${textStyles.input1.letterSpacing}px`,
                                  fontWeight: textStyles.input1.fontWeight,
                                  fontStyle: textStyles.input1.fontStyle,
                                  outline: "none",
                                  overflow: "auto",
                                  background: "transparent",
                                  color: textStyles.input1.textColor,
                                  transform: `scale(${el.flipHorizontal ? -1 : 1}, ${el.flipVertical ? -1 : 1})`,
                                  opacity: el.opacity ?? 1
                                }}
                              />
                            ) : (
                              <img
                                src={el.src}
                                alt="uploaded"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  pointerEvents: "none",
                                  transform: `scale(${el.flipHorizontal ? -1 : 1}, ${el.flipVertical ? -1 : 1})`,
                                  opacity: el.opacity ?? 1
                                }}
                              />
                            )}

                            {selectedId === el.id && (
                              <button
                                onClick={() => deleteElement(el.id)}
                                style={{
                                  position: "absolute",
                                  top: -10,
                                  right: -10,
                                  background: "#e00",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "24px",
                                  height: "24px",
                                  cursor: "pointer",
                                }}
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </Rnd>
                      ))}
                    </div>
                    {/* Drag and drop */}

                  </div>
                </div>
                <div className="design-footer">

                  <div style={{ marginTop: 20 }}>
                    <select value={format} onChange={(e) => setFormat(e.target.value)} className="footer-btn">
                      <option value="psd">.psd</option>
                      <option value="ai">.ai</option>
                      <option value="jpg">.jpg</option>
                      <option value="pdf">.pdf</option>
                    </select>

                    <button onClick={handleDownload} className="btn btn-primary nav-btn">
                      Download
                    </button>
                  </div>
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
                      <div className="d-flex justify-content-between w-100">
                        <button
                          className="text-alignment"
                          onClick={() => {
                            saveToHistory();
                            setTextStyles((prev) => ({
                              ...prev,
                              input1: {
                                ...prev.input1,
                                alignment: 'left',
                              },
                            }))
                          }

                          }
                        >
                          <Image src="/left.webp" width={40} height={40} alt="left align" />
                        </button>

                        <button
                          className="text-alignment"
                          onClick={() => {
                            saveToHistory();
                            setTextStyles((prev) => ({
                              ...prev,
                              input1: {
                                ...prev.input1,
                                alignment: 'center',
                              },
                            }))
                          }
                          }
                        >
                          <Image src="/center.webp" width={40} height={40} alt="center align" />
                        </button>

                        <button
                          className="text-alignment"
                          onClick={() => {
                            saveToHistory();
                            setTextStyles((prev) => ({
                              ...prev,
                              input1: {
                                ...prev.input1,
                                alignment: 'right',
                              },
                            }))
                          }
                          }
                        >
                          <Image src="/right.webp" width={40} height={40} alt="right align" />
                        </button>
                      </div>

                      <div className="my-4 w-100">
                        <button onClick={() => handleDecrease('input1')} className="size-btn btn-decrease">-</button>
                        <input
                          type="number"
                          value={textStyles.input1.textSize}
                          onChange={(e) => handleInputChange(e, 'input1')}
                          style={{ width: "60px" }}
                          className="font-size-input w-50"
                        />
                        <button className="size-btn btn-increase" onClick={() => handleIncrease('input1')}>+</button>
                      </div>
                      <div className="d-flex justify-content-around">
                        {/* <input
                          type="color"
                          value={textStyles.input2.textColor}
                          onChange={(e) => updateTextStyle('input2', 'textColor', e.target.value)}
                          className="text-color-input"
                        /> */}

                        <input
                          type="color"
                          value={textStyles.input1.textColorTwo}
                          onChange={(e) => {
                            const color = e.target.value;
                            updateTextStyle("input1", "textColorTwo", color);
                            if (selectedId) {
                              document.execCommand("styleWithCSS", false, true);
                              document.execCommand("foreColor", false, color);
                            }
                          }}
                          className="text-color-input"
                        />


                        <button className="size-btn" onClick={() => handleCapSamTextHandle('input1')}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.4668 8.69379L20.7134 8.12811C21.1529 7.11947 21.9445 6.31641 22.9323 5.87708L23.6919 5.53922C24.1027 5.35653 24.1027 4.75881 23.6919 4.57612L22.9748 4.25714C21.9616 3.80651 21.1558 2.97373 20.7238 1.93083L20.4706 1.31953C20.2942 0.893489 19.7058 0.893489 19.5293 1.31953L19.2761 1.93083C18.8442 2.97373 18.0384 3.80651 17.0252 4.25714L16.308 4.57612C15.8973 4.75881 15.8973 5.35653 16.308 5.53922L17.0677 5.87708C18.0555 6.31641 18.8471 7.11947 19.2866 8.12811L19.5331 8.69379C19.7136 9.10792 20.2864 9.10792 20.4668 8.69379ZM2 4C2 3.44772 2.44772 3 3 3H14V5H4V19H20V11H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM7 8H17V11H15V10H13V14H14.5V16H9.5V14H11V10H9V11H7V8Z"></path></svg>
                        </button>
                      </div>

                      <div className="">
                        <div
                          className="editor-toolbar"
                          style={{ display: "flex", gap: "1rem", padding: "10px" }}
                        >
                          <button onClick={addTextElement} className="add-text-btn">
                            Add Text
                          </button>
                          <label className="add-text-btn" style={{ cursor: "pointer" }}>
                            Add Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={addImageElement}
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="">
                        <select
                          value={textStyles.input1.fontFamily}
                          onChange={(e) =>
                            setTextStyles((prev) => ({
                              ...prev,
                              input1: {
                                ...prev.input1,
                                fontFamily: e.target.value,
                              },
                            }))
                          }
                        >
                          {fontOptions.map((font) => (
                            <option key={font.value} value={font.value}>
                              {font.label}
                            </option>
                          ))}
                        </select>





                        <button
                          className="text-alignment"
                          onClick={() =>
                            setTextStyles((prev) => ({
                              ...prev,
                              input1: {
                                ...prev.input1,
                                fontWeight: prev.input1.fontWeight === 'bold' ? 'normal' : 'bold',
                              },
                            }))
                          }
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"></path></svg>
                        </button>

                        <button
                          className="text-alignment"
                          onClick={() =>
                            setTextStyles((prev) => ({
                              ...prev,
                              input1: {
                                ...prev.input1,
                                fontStyle: prev.input1.fontStyle === 'italic' ? 'normal' : 'italic',
                              },
                            }))
                          }
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"></path></svg>
                        </button>


                      </div>
                      <div className="">
                        <p>Spacing</p>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.1"
                          value={textStyles.input1.letterSpacing}
                          onChange={(e) =>
                            setTextStyles((prev) => ({
                              ...prev,
                              input1: {
                                ...prev.input1,
                                letterSpacing: parseFloat(e.target.value),
                              },
                            }))
                          }
                        />
                        <input
                          type="text"
                          value={textStyles.input1.letterSpacing}
                          onChange={(e) =>
                            setTextStyles((prev) => ({
                              ...prev,
                              input1: {
                                ...prev.input1,
                                letterSpacing: parseFloat(e.target.value) || 0,
                              },
                            }))
                          }
                        />
                      </div>

                    </div>
                    <div className="tab-pane " id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                      <div className="image-upload">
                        <div className="upload-section">
                          <input type="file" accept="image/*" onChange={handleUpload} />
                        </div>

                        {upoloadPngImage && (
                          <div className="image-preview">
                            <img src={upoloadPngImage} alt="Preview" className="preview-image" />
                            <button className="remove-btn" onClick={handleRemoveImage}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
                            </button>
                          </div>
                        )}




                        <div className="previewCurrentImage">
                          {/* {images.length === 0 ? (
                            <p>No preview images.</p>
                          ) : (
                            <ul className="preview-list">
                              {images.map((img) => (
                                <li key={img.id} className="preview-item">
                                  <Image src={img.src} width={img.width} height={img.height} alt="Preview" />
                                  <button className="delete-button" onClick={() => deleteImage(img.id)}>
                                    X
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )} */}
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane " id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                      <input
                        type="color"
                        value={textStyles.input1.canvasBackgroundColor}
                        onChange={(e) => updateInput1Style("canvasBackgroundColor", e.target.value)}
                        className="text-color-input"
                      />
                      <div className="image-upload">
                        <input
                          type="file"
                          accept="image/*"
                          className="image-upload-input"
                          onChange={handleImageUpload}
                        />
                        {uploadedImage && (
                          <div className="image-preview">
                            <img src={uploadedImage} alt="Preview" className="preview-image" />
                            <button className="remove-btn" onClick={handleRemoveImage}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
                            </button>
                          </div>
                        )}
                      </div>
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
