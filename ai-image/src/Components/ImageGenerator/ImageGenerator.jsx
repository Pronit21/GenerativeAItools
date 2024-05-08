import './ImageGenerator.css';
import { useState, useRef } from 'react';
import default_image from '../Assets/default_image.svg';

function ImageGenerator() {
    const [image_url, setImageUrl] = useState('/');
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === '') {
            return 0;
        }

        setLoading(true);

        const response = await fetch("https://api.openai.com/v1/images/generations", 
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer ${openai_key}",
                "User-Agent": "Chrome",
            },
            body: JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n: 1,
                size: "512x512",
            }),
        });
        let data = await response.json();
        let data_array = data.data;
        setImageUrl(data_array[0].url);
        setLoading(false);
    };

    return (
        <div className='ai-image-generator'>
            <div className="header">Ai image <span>generator</span></div>
            <div className="img-loading">
                <div className="img"><img src={image_url === '/' ? default_image : image_url} alt="" /></div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}>
                        <div className={loading?"loading-text":"display-none"}>loading...</div>
                    </div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder="Search for images" />
                <div className="generate-btn" onClick={imageGenerator}>
                    Generate
                </div>
            </div>
        </div>
    );
}

export default ImageGenerator;
