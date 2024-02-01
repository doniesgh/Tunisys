import React, { useState, useEffect } from 'react';
import Card from 'components/card';
const Nbequipement = () => {
  const [equiCount, setEquiCount] = useState(null);

  useEffect(() => {

    fetch('/api/equi/number')
      .then(response => response.json())
      .then(data => setEquiCount(data.count))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Card extra="pb-7 p-[20px]">
      <p className="text-lg text-tunisys-100 font-bold dark:text-white">Nombre Equipements</p>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
        <div className="flex flex-col items-center">
        {equiCount !== null && <p className="text-4xl mt-5 text-tunisys-100 font-bold dark:text-white">{equiCount}</p>}

        </div>
      </div>
  </Card>
  );
};

export default Nbequipement;
