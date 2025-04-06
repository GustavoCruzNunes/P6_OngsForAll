// src/utils/db.ts
import mysql from 'mysql2/promise'

// Usando Pool para ambientes concorrentes e escaláveis
export const pool = mysql.createPool({
  host: 'www.thyagoquintas.com.br',
  user: 'engenharia_13',
  password: 'sabialaranjeira',
  database: 'engenharia_13',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1')
    console.log('✅ Conectado ao banco com sucesso!', rows)
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco:', err)
  }
})()

