import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

import './styles.css';

import logoImg from '../../../assets/logo.svg';
import api from '../../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ong_id = localStorage.getItem('ongId');

  const history = useHistory();

  async function newIncidentHandler(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      const result = await api.post('incident', data, {
        headers: {
          Authorization: ong_id,
        },
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
            Descreva seu caso detalhadamente para encontrar um herói para
            resolver isso.
          </p>
          <Link to="/profile" className="arrow-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={newIncidentHandler}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição do caso"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
