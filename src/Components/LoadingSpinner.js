import React from 'react';
import { ClipLoader } from 'react-spinners'; // Importa el spinner desde la librería

const LoadingSpinner = () => {
    return (
        <div style={styles.container}>
            <ClipLoader color="#c62828" loading={true} size={150} />
            <p style={styles.text}>Cargando...</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    text: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#c62828',
    },
};

export default LoadingSpinner;