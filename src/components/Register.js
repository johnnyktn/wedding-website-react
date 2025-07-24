import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/Register.css';
import emailjs from '@emailjs/browser';
import axios from 'axios';

// Reusable SongSearch Component
const SongSearch = ({ label, searchQuery, setSearchQuery, searchResults, setSearchResults, addSong, disabled }) => {
    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            const tokenResponse = await axios.post(
                'https://accounts.spotify.com/api/token',
                new URLSearchParams({ grant_type: 'client_credentials' }),
                {
                    headers: {
                        Authorization: `Basic ${btoa('cebe16e5f8a04e469e2fbaceb5e73486:9f5a40f8c0964d41b12544059a64d85c')}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const accessToken = tokenResponse.data.access_token;

            const response = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            setSearchResults(response.data.tracks.items);
        } catch (error) {
            console.error('Error searching Spotify:', error);
        }
    };

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedSearch = debounce(handleSearch, 300);

    return (
        <div>
            <label>{label}</label>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyUp={debouncedSearch}
                    placeholder="Sök på Spotify..."
                    disabled={disabled}
                />
                {searchResults.length > 0 && (
                    <ul className="dropdown">
                        {searchResults.map((track) => (
                            <li
                                key={track.id}
                                onClick={() => {
                                    addSong(track);
                                    setSearchQuery('');
                                    setSearchResults([]);
                                }}
                            >
                                {track.name} by {track.artists.map((artist) => artist.name).join(', ')}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

// Reusable KidsForm Component
const KidsForm = ({ kids, handleKidsChange, addKid, removeKid }) => (
    <div className="kids-form">
        <h2>Extra information</h2>
        {kids.map((kid, index) => (
            <div key={index} className="kid-details">
                <div>
                    <label>
                        Fullständigt namn:
                        <input
                            type="text"
                            value={kid.fullName}
                            onChange={(e) => handleKidsChange(index, 'fullName', e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>Mitt barn äter:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name={`foodChoice-${index}`}
                                value="Medhavd mat"
                                checked={kid.foodChoice === 'Medhavd mat'}
                                onChange={() => handleKidsChange(index, 'foodChoice', 'Medhavd mat')}
                            />
                            Medhavd mat
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`foodChoice-${index}`}
                                value="Från menyn"
                                checked={kid.foodChoice === 'Från menyn'}
                                onChange={() => handleKidsChange(index, 'foodChoice', 'Från menyn')}
                            />
                            Från menyn
                        </label>
                    </div>
                </div>
                <div>
                    <label>
                        Allergier/Matpreferenser (om några):
                        <input
                            type="text"
                            value={kid.allergies}
                            onChange={(e) => handleKidsChange(index, 'allergies', e.target.value)}
                            disabled={kid.foodChoice === 'Medhavd mat'}
                        />
                    </label>
                </div>
                <button type="button" onClick={() => removeKid(index)} className="remove-kid-button">
                    Remove Kid
                </button>
            </div>
        ))}
        <button type="button" onClick={addKid} className="add-kid-button">
            Lägg till barn
        </button>
    </div>
);

function Register() {
    const [isComing, setIsComing] = useState(false);
    const [plusOne, setPlusOne] = useState(false);
    const [kids, setKids] = useState(false);
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchResults1, setSearchResults1] = useState([]);
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchResults2, setSearchResults2] = useState([]);
    const [song1, setSong1] = useState(null); // State for the first song
    const [song2, setSong2] = useState(null); // State for the second song
    const [formData, setFormData] = useState({
        fullName: '',
        allergies: '',
        plusOneName: '',
        plusOneAllergies: '',
        kids: [],
        secret: '',
    });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleKidsChange = (index, field, value) => {
        const updatedKids = [...formData.kids];
        updatedKids[index] = { ...updatedKids[index], [field]: value };
        setFormData({ ...formData, kids: updatedKids });
    };

    const addKid = () => {
        setFormData({ ...formData, kids: [...formData.kids, { fullName: '', allergies: '', foodChoice: '' }] });
    };

    const removeKid = (index) => {
        const updatedKids = formData.kids.filter((_, i) => i !== index);
        setFormData({ ...formData, kids: updatedKids });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation for mandatory fields
        if (!isComing) {
            alert('Du måste ange om du kommer eller inte.');
            return;
        }
        if (!formData.fullName.trim()) {
            alert('Fullständigt namn är obligatoriskt.');
            return;
        }
        if (!formData.secret.trim()) {
            alert('En hemlighet om dig som få vet om är obligatoriskt.');
            return;
        }
        if (!song1) {
            alert('Du måste välja en låt för "Låt 1: Du lovar att dansa till".');
            return;
        }
        if (!song2) {
            alert('Du måste välja en låt för "Låt 2: Du har ett fint minne med bruden/brudgummen".');
            return;
        }

        const emailData = {
            time: new Date().toLocaleString(),
            message: `
                Coming: ${isComing ? 'Yes' : 'No'}
                Name: ${formData.fullName}
                Allergies/Food Preferences: ${formData.allergies || 'N/A'}
                Plus One: ${plusOne ? formData.plusOneName : 'N/A'}
                Plus One Allergies: ${plusOne ? formData.plusOneAllergies || 'N/A' : 'N/A'}
                Kids:
                ${kids ? formData.kids.map((kid, index) => `Kid ${index + 1}: ${kid.fullName}, Allergies: ${kid.allergies || 'N/A'}, Food Choice: ${kid.foodChoice || 'N/A'}`).join('\n') : 'N/A'}
                Song 1: ${song1 ? `${song1.name} by ${song1.artists.map((artist) => artist.name).join(', ')}` : 'Ingen låt vald'}
                Song 2: ${song2 ? `${song2.name} by ${song2.artists.map((artist) => artist.name).join(', ')}` : 'Ingen låt vald'}
                Secret: ${formData.secret || 'N/A'} 
            `,
            isComing: isComing ? 'Ja' : 'Nej',
            fullName: formData.fullName,
            allergies: formData.allergies ? formData.allergies : 'N/A',
            plusOneName: plusOne ? formData.plusOneName : 'N/A',
            plusOneAllergies: plusOne ? formData.plusOneAllergies || 'N/A' : 'N/A',
            kids: kids ? formData.kids.map(kid => `Name: ${kid.fullName}, Allergies: ${kid.allergies || 'N/A'}, Food Choice: ${kid.foodChoice || 'N/A'}`).join('; ') : 'N/A',
            song1: song1 ? `${song1.name} by ${song1.artists.map((artist) => artist.name).join(', ')}` : 'Ingen låt vald',
            song2: song2 ? `${song2.name} by ${song2.artists.map((artist) => artist.name).join(', ')}` : 'Ingen låt vald',
            secret: formData.secret || 'N/A',
        };

        console.log('Email Data:', emailData);

        // Send the email using EmailJS
        emailjs
            .send(
                'service_bbzt1nf', // Replace with your EmailJS Service ID
                'template_ruhwmc9', // Replace with your EmailJS Template ID
                emailData,
                'H_Qsp6QyAQSUXlnbp' // Replace with your EmailJS User ID
            )
            .then(
                (result) => {
                    console.log('Email sent successfully:', result.text);
                    alert('Tack för din anmälan! Din bröllopsinbjudan har skickats. Vi ser fram emot att dela denna dag med er.');
                    navigate('/submitted');
                },
                (error) => {
                    console.error('Error sending email:', error.text);
                    alert('There was an error sending your response. Please try again.');
                }
            );
    };

    return (
        <div className="register-container shared-container">
            <h1>Anmälan</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <p>Om det är något strul med formuläret så kan ni skicka alla uppgifterna i ett separat mail till <a href="mailto:johnnyktn@gmail.com">johnnyktn@gmail.com</a></p>
                    </div>
                    <label>Jag kommer! <span style={{ color: 'red' }}>*</span></label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="isComing"
                                value="Ja"
                                onChange={() => setIsComing(true)}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="isComing"
                                value="Nej"
                                onChange={() => setIsComing(false)}
                            />
                            No
                        </label>
                    </div>
                </div>

                <div>
                    <label>
                        Fullständigt namn: <span style={{ color: 'red' }}>*</span>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Allergi/Matpreferenser (om några):
                        <input
                            type="text"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleInputChange}
                            disabled={!isComing}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Kommer du ta med någon?:
                        <input
                            type="checkbox"
                            checked={plusOne}
                            onChange={(e) => setPlusOne(e.target.checked)}
                            disabled={!isComing}
                        />
                    </label>
                </div>

                {plusOne && isComing && (
                    <div className="plus-one-form">
                        <h2>Extra information</h2>
                        <div>
                            <label>
                                Fullständigt namn:
                                <input
                                    type="text"
                                    name="plusOneName"
                                    value={formData.plusOneName}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Allergier/Matpreferenser (om några):
                                <input
                                    type="text"
                                    name="plusOneAllergies"
                                    value={formData.plusOneAllergies}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                    </div>
                )}

                <div>
                    <label>
                        Barn:
                        <input
                            type="checkbox"
                            checked={kids}
                            onChange={(e) => setKids(e.target.checked)}
                            disabled={!isComing}
                        />
                    </label>
                </div>

                {kids && isComing && (
                    <KidsForm
                        kids={formData.kids}
                        handleKidsChange={handleKidsChange}
                        addKid={addKid}
                        removeKid={removeKid}
                    />
                )}

                <div>
                    <label>
                        En hemlighet om dig som få vet om: <span style={{ color: 'red' }}>*</span>
                        <div>
                            <input
                                type="text"
                                name="secret"
                                value={formData.secret || ''}
                                onChange={handleInputChange}
                                disabled={!isComing}
                            />
                        </div>
                    </label>
                </div>


                <SongSearch
                    label={
                        <span>
                            Låt 1: Du lovar att dansa till <span style={{ color: 'red' }}>*</span>
                        </span>
                    }
                    searchQuery={searchQuery1}
                    setSearchQuery={setSearchQuery1}
                    searchResults={searchResults1}
                    setSearchResults={setSearchResults1}
                    addSong={(song) => setSong1(song)} // Set the first song
                    disabled={!isComing}
                />

                <SongSearch
                    label={
                        <span>
                            Låt 2: Du har ett fint minne med bruden/brudgummen <span style={{ color: 'red' }}>*</span>
                        </span>
                    }
                    searchQuery={searchQuery2}
                    setSearchQuery={setSearchQuery2}
                    searchResults={searchResults2}
                    setSearchResults={setSearchResults2}
                    addSong={(song) => setSong2(song)} // Set the second song
                    disabled={!isComing}
                />
                <div>
                    <h3>Valda låtar:</h3>
                    <ul>
                        <li>{song1 ? `Låt 1: ${song1.name} by ${song1.artists.map((artist) => artist.name).join(', ')}` : 'Ingen låt vald'}</li>
                        <li>{song2 ? `Låt 2: ${song2.name} by ${song2.artists.map((artist) => artist.name).join(', ')}` : 'Ingen låt vald'}</li>
                    </ul>
                </div>

                <button type="submit">Skicka!</button>
            </form>
        </div>
    );
}

export default Register;