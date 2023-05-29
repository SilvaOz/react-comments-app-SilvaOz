import { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy';

// Componente CommentForm
const CommentForm = ({ onCommentSubmit }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    // Manejador para enviar el formulario de comentario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && message) {
            onCommentSubmit({ name, message });
            setName('');
            setMessage('');
        }
    };

    // Manejador para mostrar la política de privacidad
    const handlePrivacyPolicyClick = () => {
        setShowPrivacyModal(true);
    };

    // Manejador para cerrar el modal de privacidad
    const handleCloseModal = () => {
        setShowPrivacyModal(false);
    };

    // Renderizado del componente CommentForm
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="message" style={{ color: 'gray', fontSize: '14px' }}>
                    Kommentar
                </label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: '100%', height: '150px', border: 'none' }}
                />
            </div>
            <div>
                <label htmlFor="name" style={{ color: 'gray', fontSize: '14px' }}>
                    Name *
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', border: 'none' }}
                />
            </div>
            <p style={{ color: 'gray', fontSize: '14px' }}>E-mail *</p>
            <div>
                <input type="checkbox" id="saveData" />
                <label htmlFor="saveData" style={{ color: 'gray', fontSize: '14px' }}>
                    Meinen Namen, E-Mail und Website in diesem Browser speichern, bis ich wieder kommentiere.
                </label>
            </div>
            <div>
                <input type="checkbox" id="privacyPolicy" />
                <label htmlFor="privacyPolicy" style={{ color: 'gray', fontSize: '14px' }}>
                    Ich habe die <button
                        onClick={handlePrivacyPolicyClick}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'blue',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            margin: '0',
                            padding: '0',
                        }}>
                        Datenschutzerklärung
                    </button> gelesen und akzeptiere sie.*
                </label>
            </div>
            <button type="submit" style={{ backgroundColor: 'black', color: 'white', fontSize: '20px', border: 'none', cursor: 'pointer' }}>
                Kommentar abschicken
            </button>

            {/* Renderiza el modal de privacidad si showPrivacyModal es true */}
            {showPrivacyModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleCloseModal}>
                            Close
                        </button>
                        <PrivacyPolicy />
                    </div>
                </div>
            )}
        </form>
    );
};

export default CommentForm;
