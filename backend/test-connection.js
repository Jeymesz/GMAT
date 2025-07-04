const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function testConnection() {
  try {
    console.log('🔗 Testando conexão com PostgreSQL...');
    
    const client = await pool.connect();
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
    
    // Teste simples
    const result = await client.query('SELECT NOW() as current_time');
    console.log('⏰ Hora atual do banco:', result.rows[0].current_time);
    
    // Verificar se o banco existe
    const dbCheck = await client.query(`
      SELECT datname FROM pg_database WHERE datname = $1
    `, [process.env.DB_NAME]);
    
    if (dbCheck.rows.length > 0) {
      console.log(`✅ Banco "${process.env.DB_NAME}" encontrado!`);
    } else {
      console.log(`❌ Banco "${process.env.DB_NAME}" não encontrado!`);
    }
    
    client.release();
    console.log('🎉 Teste de conexão concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Dica: Verifique se o PostgreSQL está rodando');
    } else if (error.code === '28P01') {
      console.log('💡 Dica: Verifique usuário e senha no arquivo .env');
    }
  } finally {
    pool.end();
  }
}

testConnection();