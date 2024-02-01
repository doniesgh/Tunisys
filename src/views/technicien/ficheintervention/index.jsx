import React ,{useState,useEffect,useRef,useLayoutEffect }from 'react'
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import domtoimage from 'dom-to-image';
import { CSSRulePlugin } from "gsap/dist/CSSRulePlugin";
import gsap from "gsap";


const FicheIntervention = ({ handleClose,intervention}) => {
  const { user } = useAuthContext();
const [numRapport, setNumRapport] = useState(intervention?._id);
const [client, setClient] = useState(intervention?.client || "");
const [type, setType] = useState(intervention?.type || "");
const [dateDebut, setDateDebut] = useState(intervention?.createdAt || "");
const [dateFin, setDateFin] = useState(intervention?.dateFin || "");
const [description, setDescription] = useState(intervention?.description || "");
const cardRef = useRef(null);


// Register the CSSRulePlugin with GSAP
gsap.registerPlugin(CSSRulePlugin);

const handleDownload = () => {
  if (cardRef.current) {
    const proxyUrl = 'https://crossorigin.me/'; // or 'https://crossorigin.me/'

    domtoimage.toPng(cardRef.current, { cors: proxyUrl })
      .then(function (dataUrl) {
        saveAs(dataUrl, `intervention_${intervention?._id}.png`);
        window.scrollTo(0, 0);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }
};


/*
const handleDownload = () => {
  if (cardRef.current) {
    domtoimage.toPng(cardRef.current)
      .then(function (dataUrl) {

        saveAs(dataUrl, `intervention_${intervention?._id}.png`);
        window.scrollTo(0, 0);

      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }
};*/
/*useEffect(() => {
  const handleDownload = () => {
    if (cardRef.current) {
      domtoimage
        .toPng(cardRef.current, { width: cardRef.current.offsetWidth, height: cardRef.current.offsetHeight })
        .then(function (dataUrl) {
          saveAs(dataUrl, 'your_image.png');
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    }
  };

  handleDownload();
}, []);*/


useEffect(() => {
  setNumRapport(intervention?._id || '');
  setClient(intervention?.client || '');
  setType(intervention?.type || '');
  setDateDebut(intervention?.createdAt || '');
  setDateFin(intervention?.dateFin || '');
  setDescription(intervention?.description || '');
  console.log(cardRef.current);
  //handleDownload()

}, [intervention]);
return (
   
    <div  className="rounded-md fixed p-8  main top-0 left-0  center border-2 z-10 shadow-lg mt-[150px] ml-[550px] items-center bg-white border-tunisys-100">
      <div  ref={cardRef}className='bg-white'>
      <div className="flex w-full" >
        <div>
          <h2 className=" text-[25px] font-semibold  text-tunisys-100">Tunisys</h2>
          <h2 className=" text-[15px] font-semibold ">124,Avenue de la liberté</h2>
          <h2 className=" text-[15px] font-semibold ">1002 Tunis-Bélvedére</h2>
          <h2 className=" text-[15px] font-semibold  ">Tél : 71 791 699 </h2>
          <h2 className=" text-[15px] font-semibold">Fax : 71 786 188</h2>

        </div>
        <div className='' >
          <h2 className="p-3  border-8 border-red-700 text-[35px] font-semibold text-center text-tunisys-100 ml-7	">Fiche Intervention</h2>
        </div>
        <div className='ml-7'>
        <h2 className="text-[20px] font-semibold  ">Date : <span className='text-[15px]'>{new Date(dateFin).toLocaleString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      
                    })}</span></h2>
        <h2 className="text-[20px] font-semibold  ">Numéro : <span className='text-[15px]'>{numRapport}</span> </h2>
        </div>
      </div>
      <div className='main border-red-800 ' >
      <form class="form" >
      <div className='border-8 block-inline	' >
          <div className='center  items-center justify-center text-center'>
          <span className='text-[20px] border-8  '>Client</span>
          </div>
        <div>
        <input
                readOnly
                type="text"
               value={client}
               onChange={(e) => setClient(e.target.value)}
               className="w-full h-9 mt-3 text-center text-lg"
              />
        </div>
        </div>
    <div class="flex">
    <div className='border-8 w-[50%]'>
          <div className='center  items-center justify-center text-center'>
          <span className='text-[20px] border-8 '>Style systéme </span>
          </div>
        <div>
        <input readOnly
        type="text"
       value={type}
       onChange={(e) => setType(e.target.value)}
       className="w-full h-9 mt-3 text-center text-lg"/>
        </div>
        </div>
        <div className='border-8 w-[50%]	'>
          <div className='center  items-center justify-center text-center'>
          <span className='text-[20px] border-8 '>Num série </span>
          </div>
        <div>
        <input
         readOnly
         type="text"
        value={numRapport}
        onChange={(e) => setType(e.target.value)}
        className="w-full h-9 mt-3 text-center text-lg"
        />
        </div>
        </div>
    </div>  
    <div className='border-8 block-inline	'>
          <div className='center  items-center justify-center text-center'>
          <span className='text-[20px] border-8'>Nature panne </span>
          </div>
        <div>
        <input
        readOnly
        type="text"
       value={type}
       onChange={(e) => setType(e.target.value)}
       className="w-full h-9 mt-3 text-center text-lg"
       />
        </div>
        </div>
        <div className='border-8 block-inline	'>
          <div className='center  items-center justify-center text-center'>
          <span className='text-[20px] border-8 '>Heure </span>
          </div>
        <div className='flex mt-4'>
        <p className='text-[18px]'> D'arrivé</p>
        <input  readOnly
              type="text"
              className='text-[18px] w-[50%] h-9 mt-3 text-center'
              value={new Date(dateDebut).toLocaleString('fr-FR', {
                hour: 'numeric',
                minute: 'numeric',
                
              })}/>
        <p className='text-[18px] w-[50%] h-9 mt-3'> D'intervention</p>
        <input type="text"
              readOnly
              className='text-[18px] w-[50%] h-9 mt-3 text-center'
              value={new Date(dateFin).toLocaleString('fr-FR', {
                hour: 'numeric',
                minute: 'numeric',
                
              })}/>
        </div>
        </div>
        <div className='border-8 block-inline	'>
          <div className='center  items-center justify-center text-center'>
          <span className='text-[20px] border-8'>Action envisagé </span>
          </div>
        <div>
        <input 
         readOnly
         type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-9 mt-3 text-center text-lg"/>
        </div>
        </div>
  
        <div className='border-8 block-inline	'>
          <div className='center  items-center justify-center text-center'>
          <span className='text-[20px] border-8'>Visa </span>
          </div>
        <div className='flex'>
        <input required="" type="tel" placeholder="" className="w-full h-[50px] mt-3 border-4"/>
        <input required="" type="tel" placeholder="" className="w-full h-[50px] mt-3 border-4"/>

        </div>
        </div>
        

</form>
</div>

      </div>
      <div className=' text-center mt-3'>
        <button className='bg-tunisys-100 text-white p-3 rounded-lg' onClick={handleDownload}>Imprimer</button>
        <button
            className=" rounded bg-gray-500 ml-3  p-3 font-bold text-white hover:bg-gray-600"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
     
  )
}

export default FicheIntervention