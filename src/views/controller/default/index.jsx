import Nbequipement from "./components/Nbequipement";
import Nbreclaramation from "./components/Nbreclaramation";
import NbClients from "./components/NbClients";
import Nbtechnicien from "./components/Nbtechnicien";
import NbHelpdesk from "./components/NbHelpdesk";
const ControllerDashboard = () => {
  return (
    <div>

      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-1">
        <NbHelpdesk />
      </div>

      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-1">
        <NbClients />
      </div>
      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-1">
        <Nbtechnicien />
      </div>
      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-1">
        <Nbequipement />
      </div>
      <div className="mt-2 grid grid-cols-1 gap-4  w-full h-[25px rounded-[20px] md:grid-cols-1">
        <Nbreclaramation />
      </div>
    </div>
  );
};

export default ControllerDashboard;
