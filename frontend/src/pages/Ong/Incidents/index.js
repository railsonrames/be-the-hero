import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../../services/api';

import './styles.css';

import logoImg from '../../../assets/logo.svg';
import { toast } from 'react-toastify';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api
      .get('incident/ong', { headers: { Authorization: ongId } })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function deleteHandler(id) {
    try {
      await api.delete(`incident/${id}`, {
        headers: { Authorization: ongId },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
      toast.success('Incidente removido com sucesso.');
    } catch (error) {
      toast.error(`Não foi possível remover o incidente. ${error.message}.`);
    }
  }

  function logoutHandler() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="incidents-container">
      <header>
        {/* <Link to="/"> */}
        <img src={logoImg} alt="Be The Hero" />
        {/* </Link> */}
        <span>Bem vindo(a), {ongName}</span>
        <Link className="button" to="/ong/new-incident">
          Cadastrar novo caso
        </Link>
        <button onClick={logoutHandler} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>
            <strong>Descrição:</strong>
            <p>{incident.description}</p>
            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>
            <button type="button" onClick={() => deleteHandler(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
