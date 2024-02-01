import Card from 'components/card';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddClient from './composants/addClient';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClientName, setSelectedClientName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    // Fetch clients from the server
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/client/list');
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleCardClick = (clientId, clientName) => {
    setSelectedClient(clientId);
    setSelectedClientName(clientName)
    console.log(clientId, clientName)
  };

  return (
    <>
          <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'>Clients</h1>
        <div className="mt-2 flex justify-end">
          <button
            title="Ajouter client"
            class="group cursor-pointer bg-tunisys-100  w-[50px] rounded outline-none "
            onClick={handleOpenModal}
          >
           <p className='font-bold text-[50px] hover:rotate-90 duration-300 text-white'>+</p>
          </button>
        </div>
      <div className="mt-2 grid grid-cols-1 gap-5 w-full h-full rounded-[20px] md:grid-cols-5">
        {clients.map((client) => (
          <Link
            key={client._id}
            to={{
              pathname: `/admin/agence/${client._id}/${client.name}`,
              state: { clientName: client.name },
            }}
            style={{ textDecoration: 'none' }}
          >
            <Card
              extra="pb-7 p-[20px] h-[100px]"
              onClick={() => handleCardClick(client._id, client.name)}
            >
              <p className="text-[30px] text-center text-tunisys-100 font-bold dark:text-white">
                {client.name}
              </p>
              <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {isModalOpen && (
      <div className='modal'>
        <div className='modal-content border-x-violet-800	'>
          <span className='close' onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
          {isModalOpen && <AddClient handleClose={handleCloseModal}  />
}
        </div>
      </div>
    )}
     
    </>
  );
};

export default Client;
