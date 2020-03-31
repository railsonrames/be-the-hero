const dbconnection = require('../database/dbconnection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    const [count] = await dbconnection('incidents').count();
    response.header('X-Total-Count', count['count(*)']);

    const incidents = await dbconnection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    return response.json(incidents);
  },

  async byOng(request, response) {
    const ong_id = request.headers.authorization;
    const incidents = await dbconnection('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    console.log(request.body);
    const ong_id = request.headers.authorization;
    console.log(request.headers.authorization);
    const [id] = await dbconnection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await dbconnection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await dbconnection('incidents')
      .where('id', id)
      .delete();

    return response.status(204).send();
  }
};
