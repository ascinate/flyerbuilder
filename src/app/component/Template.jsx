import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Template() {
    return (
        <>
            <ul className='template-ul'>
                <li className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                    <input type="text" placeholder="search" className='template-search-input w-100' />
                </li>
                <li>
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All</button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">categories</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div className='mx-auto'>
                                <ul>
                                    <li>
                                        <Link href='/' className='template-image'>
                                            <Image
                                                src='/temptwo.webp'
                                                width={200}
                                                height={30}
                                                alt='photo'
                                                className='rounded'
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/' className='template-image'>
                                            <Image
                                                src='/tempone.webp'
                                                width={200}
                                                height={30}
                                                alt='photo'
                                                className='rounded'
                                            />
                                        </Link>
                                    </li>
                                </ul>
                            </div>


                        </div>
                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                    </div>
                </li>
            </ul>

        </>
    )
}

export default Template