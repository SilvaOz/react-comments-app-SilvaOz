import React from 'react';
import '../App.css';

// Componente Comment
const Comment = ({ comment, onDelete }) => {
    // Función para formatear la fecha
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

    // Renderizado del componente Comment
    return (
        <div className="comment-container">
            <div>
                {/* Nombre del comentario */}
                <strong className="comment-name">{comment.name}</strong>
            </div>
            <div>
                {/* Fecha del comentario */}
                <span className="comment-date">{formatDate(comment.dateTime)}</span>
            </div>
            <div className="comment-content">
                <div>{comment.message}</div>
                {/* Botón para eliminar el comentario */}
                <button className="comment-delete-button" onClick={() => onDelete(comment.id)}>
                    Löschen
                </button>
            </div>
        </div>
    );
};

export default Comment;
