import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function Template({ onSelectImage }) {

    const [searchTerm, setSearchTerm] = useState('');



    const templateImages = [
        { src: '/bg-one.jpg', href: '/', alt: 'sky-photo' },
        { src: '/bg-two.jpg', href: '/', alt: 'bg-bottol-photo' },
        { src: '/tempone.webp', href: '/', alt: 'bg-woman-photo' },
    ];
    return (
        <ul className='template-ul'>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="..." /></svg>
                <input
                    type="text"
                    placeholder="search"
                    className="template-search-input w-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />

            </li>
            <li>
                <nav>
                    <div className="nav nav-tabs" role="tablist">
                        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-home">All</button>
                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-profile">Categories</button>
                    </div>
                </nav>


                <div className='mx-auto'>
                    <ul className='olul'>
                        {templateImages
                            .filter((template) => template.alt.toLowerCase().includes(searchTerm))
                            .map((template, index) => (
                                <li key={index}>
                                    <button
                                        className="template-image border-0 bg-transparent p-0"
                                        onClick={() => onSelectImage(template.src)}
                                    >
                                        <Image
                                            src={template.src}
                                            width={200}
                                            height={30}
                                            alt={template.alt}
                                            className="rounded"
                                        />
                                    </button>
                                </li>
                            ))}
                    </ul>

                </div>



            </li>
        </ul >
    );
}
export default Template