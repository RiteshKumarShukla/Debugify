import React, { useState } from 'react';
import './converter.css';
// replace backend-url with latest backend url
const Converter = () => {
    const [inputCode, setInputCode] = useState('');
    const [language, setLanguage] = useState('Java');
    const [convertedCode, setConvertedCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCodeChange = (e) => {
        setInputCode(e.target.value);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleConvert = async () => {
        try {
            setLoading(true);
            const response = await fetch(`backend-url/convert?language=${language}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputcode: inputCode }),
            });

            if (!response.ok) {
                throw new Error('Code conversion failed');
            }

            const convertedCode = await response.json();
            setLoading(false);
            setConvertedCode(convertedCode);
        } catch (error) {
            console.error('Error during code conversion:', error);
        }
    };

    const handleDebug = async () => {
        try {
            setLoading(true);
            const response = await fetch(`backend-url/debug`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputcode: inputCode }),
            });

            if (!response.ok) {
                throw new Error('Code conversion failed');
            }

            const convertedCode = await response.json();
            setLoading(false);
            setConvertedCode(convertedCode);
        } catch (error) {
            console.error('Error during code conversion:', error);
        }
    };

    const handleQuality = async () => {
        try {
            setLoading(true);
            const response = await fetch(`backend-url/qualityCheck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputcode: inputCode }),
            });

            if (!response.ok) {
                throw new Error('Code conversion failed');
            }

            const convertedCode = await response.json();
            setLoading(false);
            setConvertedCode(convertedCode);
        } catch (error) {
            console.error('Error during code conversion:', error);
        }
    };

    return (
        <div>
            <div className="converter-container">
                <div className="input-section">
                    <h2 className="title">Debugify</h2>
                    <p className="subtitle">Unlock the Power of Code: Transform, Debug, and Optimize with Ease!</p>
                    <textarea
                        value={inputCode}
                        onChange={handleCodeChange}
                        placeholder="Enter code here....."
                        className="code-input"
                    ></textarea>
                </div>
                <div className="options-section">
                    <h2 className="title">Choose The Language</h2>
                    <select value={language} onChange={handleLanguageChange} className="language-select">
                        <option value="">Select Language</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                        <option value="PHP">PHP</option>
                    </select>
                    <button onClick={handleConvert} className="convert-button" disabled={inputCode === ''}>
                        Convert
                    </button>
                    <button onClick={handleDebug} className="debug-button" disabled={inputCode === ''}>
                        Debug
                    </button>
                    <button onClick={handleQuality} className="quality-button" disabled={inputCode === ''}>
                        Quality Check
                    </button>
                    <textarea
                        value={loading ? 'Please wait while response is loading....' : convertedCode}
                        readOnly
                        className="code-output"
                        placeholder="Converting Code to Magic..."
                    ></textarea>
                </div>
            </div>
            <footer className="footer">
                <h3>Made with ❤️ by <a href="https://github.com/RiteshKumarShukla">Ritesh Kr. Shukla</a></h3>
                <h5>No © copyright issues.</h5>
                <p>Feel free to copy. If you need any help, ping me !</p>
            </footer>
        </div>
    );
};

export default Converter;
