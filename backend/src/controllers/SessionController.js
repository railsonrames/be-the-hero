const dbconnection = require('../database/dbconnection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await dbconnection('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return response
        .status(400)
        .json({ error: 'No such ONG found with this ID.' });
    }

    return response.json(ong);
  }
};
