import React from 'react'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function ScrapeInfo() {
    const url = useRef()

    const [isScraped, setIsScraped] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [isFetching, setIsFetching] = useState(false)

    const handleGetInfo = async (e) => {
        e.preventDefault()

        // validate poshmark url and scrape data
        let poshmark_url = url.current.value.split('/')

        if (poshmark_url[2] === 'www.poshmark.com' || poshmark_url[2] === 'poshmark.com' || poshmark_url[2] === 'posh.mk') {
            setIsFetching(true)
            const obj = {
                url: url.current.value,
            }
            try {
                const res = await axios.post('http://localhost:8800/api/users/get-info', obj)
                if (res.status === 200) setIsScraped(true)
                setIsFetching(false)
                setUserInfo(res.data)
            } catch (error) {
                alert(error)
            }
        }
        else alert('Please enter correct Poshmark url')
    }

    return (
        <div>
            <form>
                <input width='500px' height='25px' placeholder='Profile Url' ref={url} className="url" /><br />
            </form>
            <button onClick={handleGetInfo} className="getInfo">Get Info</button><br />
            <Link to='/'>Go to Sign Up page</Link><br /><br />

            {isScraped ?
                <div style={{ marginTop: '30px' }}>
                    <h3>User Info</h3>
                    <span>Name: {userInfo.name}</span><br />
                    <span>Number Of Listing: {userInfo.numberOfListing}</span><br />
                    <img width='200px' height='200px' src={userInfo.profilPhotoSrc} />
                </div>
                : isFetching ? <h2>Fetching User Info...</h2> : ''}
        </div>
    )
}
