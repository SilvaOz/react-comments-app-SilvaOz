import React, { useState } from 'react';

const CommentForm = ({ onCommentSubmit }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && message) {
            onCommentSubmit({ name, message });
            setName('');
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="message" style={{ color: 'gray', fontSize: '14px' }}>Kommentar</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: '100%', height: '150px', border: 'none' }}
                />
            </div>
            <div>
                <label htmlFor="name" style={{ color: 'gray', fontSize: '14px' }}>Name *</label>
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
                <label htmlFor="saveData" style={{ color: 'gray', fontSize: '14px' }}>Meinen Namen, E-Mail und Website in diesem Browser speichern, bis ich wieder kommentiere.</label>
            </div>
            <div>
                <input type="checkbox" id="privacyPolicy" />
                <label htmlFor="privacyPolicy" style={{ color: 'gray', fontSize: '14px' }} >Ich habe die <span style={{ color: 'blue' }}>Datenschutzerklärung</span>  gelesen und akzeptiere sie.*</label>
            </div>
            <button type="submit" style={{ backgroundColor: 'black', color: 'white', fontSize: '20px' }}>
                Kommentar abschicken
            </button>
        </form>
    );
};

const Comment = ({ comment, onDelete }) => {
    const formatDate = (date) => {
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return new Date(date).toLocaleString('de-DE', options);
    };

    return (
        <div className="comment-container">
            <div>
                <strong style={{ color: 'blue' }}>{comment.name}</strong>
            </div>
            <div>
                <span style={{ color: 'gray', fontSize: '14px' }}>{formatDate(comment.dateTime)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#404242' }}>
                <div>{comment.message}</div>
                <button onClick={() => onDelete(comment)}>Löschen</button>
            </div>
        </div>
    );
};


const CommentApp = () => {
    const [comments, setComments] = useState([]);

    const handleCommentSubmit = (comment) => {
        const currentDateTime = new Date().toISOString();
        comment.dateTime = currentDateTime;
        setComments([...comments, comment]);
    };

    const handleCommentDelete = (comment) => {
        const updatedComments = comments.filter((c) => c !== comment);
        setComments(updatedComments);
    };

    return (
        <div>
            <h2>🗨 Teile deine Meinung zu diesem Artikel!</h2>
            {comments.length >= 1 ? <h3>🗯 {comments.length} Kommentar</h3> : null}

            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} onDelete={handleCommentDelete} />
            ))}

            <h3>Schreib einen Kommentar</h3>
            <p style={{ fontSize: '18px' }}>Deine E-Mailadresse wird nicht öffentlich angezeigt. Erforderliche Felder sind mit * markiert.</p>
            <CommentForm onCommentSubmit={handleCommentSubmit} />
        </div>
    );
};

export default CommentApp;
