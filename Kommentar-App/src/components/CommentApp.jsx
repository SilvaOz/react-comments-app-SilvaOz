import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { FaComment } from 'react-icons/fa';
import { BsFillChatLeftFill } from 'react-icons/bs';
import '../App.css';

// Componente CommentApp
const CommentApp = () => {
    const [comments, setComments] = useState([]);

    // Cargar los comentarios desde el localStorage al iniciar la aplicación
    useEffect(() => {
        const storedComments = localStorage.getItem('comments');
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        }
    }, []);

    // Actualizar el localStorage cuando cambien los comentarios
    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

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
