import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { FaComment } from 'react-icons/fa';
import { BsFillChatLeftFill } from 'react-icons/bs';
import '../App.css';

// Componente CommentApp
const CommentApp = () => {
    const [comments, setComments] = useState([]);

    // Manejador para enviar un comentario
    const handleCommentSubmit = (comment) => {
        const currentDateTime = new Date().toISOString();
        comment.dateTime = currentDateTime;
        comment.id = crypto.randomUUID();
        setComments((prevComments) => [...prevComments, comment]);
    };

    // Manejador para eliminar un comentario
    const handleCommentDelete = (id) => {
        setComments((prevComments) => prevComments.filter((c) => c.id !== id));
    };

    // Renderizado del componente CommentApp
    return (
        <div className="comment-app-container">
            <h2>
                <FaComment /> Teile deine Meinung zu diesem Artikel!
            </h2>
            {comments.length >= 1 && (
                <h3>
                    <BsFillChatLeftFill style={{ fontSize: '13px' }} /> {comments.length} Kommentar
                </h3>
            )}
            {/* Renderiza cada comentario */}
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} onDelete={handleCommentDelete} />
            ))}
            <h3>Schreib einen Kommentar</h3>
            <p className="comment-app-note">Deine E-Mailadresse wird nicht öffentlich angezeigt. Erforderliche Felder sind mit * markiert.</p>
            {/* Renderiza el formulario para agregar comentarios */}
            <CommentForm onCommentSubmit={handleCommentSubmit} />
        </div>
    );
};

export default CommentApp;
