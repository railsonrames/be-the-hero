import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import './styles.css';
import logoImg from '../../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function newIncidentHandler(event) {
    event.prevetDefault();

    const data = { title, description, value };

    try {
      const result = await api.post('incident', data, {
        headers: { Authorization: ongId },
      });

      toast.success(`Incidente criado com sucesso, ID: ${result.data.id}.`);
      history.push('/ong/incidents');
    } catch (error) {
      toast.error(
        `Não foi possível cadastrar o novo incidente. ${error.message}.`
      );
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="arrow-link" to="/ong/incidents">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para a home
          </Link>
        </section>

        <form onSubmit={newIncidentHandler}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastar
          </button>
        </form>
      </div>
    </div>
  );
}
