import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, email, telefono } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'germaneduardocontacto@gmail.com',
      subject: 'Nueva Cotización de Mayorista',
      html: `<p>Nuevo mensaje de cotización:</p><p><b>Nombre:</b> ${nombre}</p><p><b>Email:</b> ${email}</p><p><b>Teléfono:</b> ${telefono}</p>`
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
