import React from 'react';
import styles from './Mensajes.css';

const Mensajes = () => {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.inbox}>
                <h2>Bandeja de Entrada</h2>
                <div className={styles.inboxItem}>
                    <img src="https://via.placeholder.com/50" alt="User 1" className={styles.avatar} />
                    <div className={styles.inboxInfo}>
                        <h4>Usuario 1</h4>
                        <p>Último mensaje...</p>
                    </div>
                </div>
                <div className={styles.inboxItem}>
                    <img src="https://via.placeholder.com/50" alt="User 2" className={styles.avatar} />
                    <div className={styles.inboxInfo}>
                        <h4>Usuario 2</h4>
                        <p>Último mensaje...</p>
                    </div>
                </div>
            </div>
            <div className={styles.chatBox}>
                <div className={styles.chatHeader}>
                    <img src="https://via.placeholder.com/50" alt="Usuario 1" className={styles.avatar} />
                    <h3>Usuario 1</h3>
                </div>
                <div className={styles.chatMessages}>
                    <div className={`${styles.message} ${styles.recipient}`}>
                        <p>Hola, ¿cómo estás?</p>
                    </div>
                    <div className={`${styles.message} ${styles.sender}`}>
                        <p>¡Hola! Estoy bien, ¿y tú?</p>
                    </div>
                    <div className={`${styles.message} ${styles.recipient}`}>
                        <p>Bien también, gracias por preguntar.</p>
                    </div>
                    <div className={`${styles.message} ${styles.sender}`}>
                        <p>Me alegra escuchar eso. ¿Qué has estado haciendo últimamente?</p>
                    </div>
                    <div className={`${styles.message} ${styles.recipient}`}>
                        <p>He estado trabajando en un nuevo proyecto. ¿Y tú?</p>
                    </div>
                    <div className={`${styles.message} ${styles.sender}`}>
                        <p>Lo mismo aquí, muchos proyectos en marcha.</p>
                    </div>
                </div>
                <div className={styles.chatInput}>
                    <input type="text" placeholder="Escribe un mensaje..." />
                    <button>Enviar</button>
                </div>
            </div>
        </div>
    );
}

export default Mensajes;
