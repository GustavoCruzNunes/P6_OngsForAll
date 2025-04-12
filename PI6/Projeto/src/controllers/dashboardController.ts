
import { FastifyRequest, FastifyReply } from 'fastify'
import { pool } from '../config/ds'

export async function renderDashBoardPage(request: FastifyRequest, reply: FastifyReply) {
  const user = request.session.user
  if (!user) return reply.redirect('/login')

  // 🔎 Buscar dados de exemplo do banco
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  // Gráfico 1: ONGs apoiadas (usando valor como exemplo)
  const [dadosMes]: any = await pool.query(`
    SELECT MONTH(data) AS mes, SUM(valor) AS total
    FROM doacoes
    WHERE usuario_id = ?
    GROUP BY MONTH(data)
  `, [user.id])

  const labelsMes = ["Jan", "Fev", "Mar", "Abr", "Mai"];
const valoresMes = [50.00, 75.50, 100.00, 125.00, 90.00];

  // Gráfico 2: Doações por tipo
  const [dadosTipo]: any = await pool.query(`
    SELECT tipo, SUM(valor) AS total
    FROM doacoes
    WHERE usuario_id = ?
    GROUP BY tipo
  `, [user.id])

  const labelsTipo = ["Educação", "Saúde", "Animais", "Meio ambiente"];
const valoresTipo = [120.00, 80.00, 50.00, 70.00];

return reply.view('templates/dashboard.hbs', {
  user,
  labelsMes: JSON.stringify(["Jan", "Fev", "Mar", "Abr"]),
  valoresMes: JSON.stringify([1, 2, 3, 4]),
  labelsTipo: JSON.stringify(["Educação", "Saúde", "Meio ambiente"]),
  valoresTipo: JSON.stringify([100, 75, 50])
}, { layout: 'layouts/dashboardLayout' })
}
