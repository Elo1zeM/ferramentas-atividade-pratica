const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Rota teste
app.get('/', (req, res) => {
  res.json({ mensagem: '🟢 API rodando!' });
});

// GET - Buscar todos os produtos
app.get('/ferramentas', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ferramentas')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// GET - Buscar produto por ID
app.get('/ferramentas/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ferramentas')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// POST - Criar novo produto
app.post('/ferramentas', async (req, res) => {
  try {
    const {ferramenta, id_jogador, resultados} = req.body;
    const { data, error } = await supabase
      .from('ferramentas')
      .insert([{ferramenta, id_jogador, resultados}])
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// PUT - Atualizar produto
app.put('/ferramentas/:id', async (req, res) => {
  try {
    const {ferramenta, id_jogador, resultados} = req.body;
    const { data, error } = await supabase
      .from('ferramentas') 
      .update({ferramenta, id_jogador, resultados})
      .eq('id', req.params.id)
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// DELETE - Deletar produto
app.delete('/ferramentas/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('ferramentas')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ mensagem: '❌ ferramenta deletada!' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});