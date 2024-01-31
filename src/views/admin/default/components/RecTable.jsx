import React ,{useEffect} from "react";
import {useReclamationsContext} from "Hooks/useRecsContext";
import 'apexcharts/dist/apexcharts.css';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const RecTable = () => {
  const { user } = useAuthContext();

  const { reclamations, dispatch } = useReclamationsContext()

 /* useEffect(() => {
    const fetchReclamations = async () => {
      const response = await fetch('/api/rec/',{
        headers : {
          Authorization: `Bearer ${user.token}`

        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_REC', payload: json})
      }
    }
    

      fetchReclamations()
  
  }, [dispatch,user])*/
  
  return (
    <div extra="flex flex-col w-full rounded-3xl py-6 px-2 ">
    <h2 className="text-lg text-center font-bold text-tunisys-100 dark:text-white">
      Liste des réclamations :
    </h2>
    <br />
    <div className="md:mt-16 lg:mt-0">
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-solid">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-solid p-2">Id Réclamation</th>
              <th className="border border-solid p-2">Client</th>
              <th className="border border-solid p-2">Etat</th>
            </tr>
          </thead>
          <tbody>
          {/*reclamations && reclamations.map((reclamation) => (

              <tr key={reclamation._id}>
                <td className="border border-solid p-2">{reclamation._id}</td>
                <td className="border border-solid p-2">{reclamation.client}</td>
                <td className="border border-solid p-2">{reclamation.etat}</td>
              </tr>
          ))*/}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  );
};

export default RecTable;
