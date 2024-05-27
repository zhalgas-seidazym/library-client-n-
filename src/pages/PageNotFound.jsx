import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function PageNotFound() {
    const [text, setText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        inputAnimation();
    }, []);

    const inputAnimation = () => {
        const text = 'OOPs, page not found.';
        let animatedText = '';
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                animatedText += text.charAt(i);
                setText(animatedText);
            }, i * 100);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className='container'>
            <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                <p className='not-found-text' id='notFoundText'>
                    {text}
                </p>
                <div>
                    <button className='goBackButton' onClick={goBack}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
