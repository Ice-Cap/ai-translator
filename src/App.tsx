import React, { ChangeEvent, useState } from 'react'
import Select from './components/Select';

const englishTitle = 'AI Translator';
const languageOptions = [{value: 'spanish', label: 'Spanish'}, {value: 'french', label: 'French'}, {value: 'german', label: 'German'}, {value: 'italian', label: 'Italian'}, {value: 'english', label: 'English'}];

function App() {
    const [language, setLanguage] = useState('spanish');
    const [title, setTitle] = useState(englishTitle);
    const [userText, setUserText] = useState('Translate me!');
    const [loading, setLoading] = useState({text: false, title: false});

    async function translate(text: string, target: string) {
        setLoading({ ...loading, [target]: true});
        const response = await fetch(`http://127.0.0.1:3000/translate?text=${text}&language=${language}`);
        const data = await response.json();

        if (target === 'title') {
            setTitle(data.translation);
        } else {
            setUserText(data.translation);
        }

        setLoading({ ...loading, [target]: false})
    }

    return (
        <main>
            <h1>{title}</h1>
            <Select 
                options={languageOptions}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLanguage(e.target.value)} 
            />
            <button onClick={() => translate(englishTitle, 'title')}>Translate title</button>
            {loading.title && <span className="spinner"></span>}
            <div>
                <h2>{userText}</h2>
                <input value={userText} onChange={(e) => setUserText(e.target.value)} />
                <Select 
                    options={languageOptions}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLanguage(e.target.value)} 
                />
                <button onClick={() => translate(userText, 'text')}>Translate text</button>
                {loading.text && <span className="spinner"></span>}
            </div>
        </main>
    )
}

export default App;
