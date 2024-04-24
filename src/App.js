import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { JogoProvider, useJogoContext } from './JogoContext';

const LazyResultados = React.lazy(() => import('./Resultados'));

function App() {
  return (
    <JogoProvider>
      <AppContent />
    </JogoProvider>
  );
}

function AppContent() {
  const { nomeJogo, setNomeJogo, erro, setErro, setResultados } = useJogoContext();

  const buscarJogo = () => {
    if (!nomeJogo.trim()) {
      setErro('Por favor, insira o nome do jogo.');
      return;
    }

    const apiKey = 'd209e82699274d69bc9dc1012f9b73b7';
    const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(nomeJogo)}&key=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar jogo. Por favor, tente novamente mais tarde.');
        }
        return response.json();
      })
      .then(response => {
        setErro('');
        setResultados(response.results);
      })
      .catch(error => {
        setErro(error.message);
      });
  };

  return (
    <div>
      <Typography variant="h1">Busca de Jogos</Typography>
      <TextField
        id="nomeJogo"
        label="Digite o nome do jogo"
        value={nomeJogo}
        onChange={e => setNomeJogo(e.target.value)}
      />
      <Button variant="contained" onClick={buscarJogo}>Buscar</Button>
      {erro && <Typography style={{ color: 'red' }}>{erro}</Typography>}
      <React.Suspense fallback={<div>Carregando...</div>}>
        <LazyResultados />
      </React.Suspense>
    </div>
  );
}

export default App;