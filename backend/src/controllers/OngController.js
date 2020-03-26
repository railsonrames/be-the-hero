const crypto = require('crypto');

const dbconnection = require('../database/dbconnection');

module.exports = {
  async index(request, response) {
    const ongs = await dbconnection('ongs').select('*');
    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(5).toString('HEX');

    await dbconnection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id });
  }
};
