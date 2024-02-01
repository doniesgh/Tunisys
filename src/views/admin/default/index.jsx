import Nbequipement from "./components/Nbequipement";
import Nbreclaramation from "./components/Nbreclaramation";
import NbClients from "./components/NbClients";
import Nbtechnicien from "./components/Nbtechnicien";
import Charts from "./components/Charts";
import RecTable from "./components/RecTable";
import NbHelpdesk from "./components/NbHelpdesk";

const Dashboard = () => {
  return (
    <div>
      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-5">
        <Nbequipement />
        <Nbreclaramation />
        <NbClients />
        <Nbtechnicien />
        <NbHelpdesk />

      </div>


      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-1">

        <Charts />


      </div>
      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-1">

        <RecTable />
      </div>
    </div>
  );
};

export default Dashboard;
