import React from 'react';
import { Typography } from '@mui/material';
import { useJogoContext } from './JogoContext';

const Resultados = () => {
  const { resultados } = useJogoContext();

  return (
    <div>
      {resultados.map(jogo => (
        <div key={jogo.id}>
          <img src={jogo.background_image} alt={jogo.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          <Typography>{jogo.name} - Plataformas: {jogo.platforms.map(plataforma => plataforma.platform.name).join(', ')}</Typography>
        </div>
      ))}
    </div>
  );
};

export default Resultados;