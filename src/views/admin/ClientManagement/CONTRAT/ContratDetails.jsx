import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, isValid } from 'date-fns';

const ContratDetails = () => {
    const { contratId } = useParams();
    const [contratDetails, setContratDetails] = useState([]);
    console.log('id', contratId)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (contratId) {
            fetch(`/api/contrat/${contratId}`)
                .then(response => response.json())
                .then(data => setContratDetails(data))
                .catch(error => console.error('Error fetching contrat details:', error));
        }

    }, [contratId]);
    if (!setContratDetails) {
        return <div>Loading...</div>;
    }
    console.log(contratDetails)
    const handleImageClick = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <>
            <h1 className="text-[1.7em] text-tunisys-100  mb-2.5 mx-0 text-center font-semibold dark:text-gray-600"> {contratDetails.contrat_sn}</h1>
            <div className='min-w-screen p-5 py-10 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white dark:bg-gray-900'>
                <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>contrat_sn :   </strong>
                            {contratDetails.contrat_sn}
                        </p>
                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>service_cn :</strong> {contratDetails.service_cn}</p>
                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>effective_date : </strong>
                            {isValid(new Date(contratDetails.effective_date)) ? format(new Date(contratDetails.termination_date), 'yyyy/MM/dd') : 'N/A'}

                        </p>
                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>termination_date :   </strong>
                            {isValid(new Date(contratDetails.termination_date)) ? format(new Date(contratDetails.termination_date), 'yyyy/MM/dd') : 'N/A'}
                        </p>

                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200">
                            <strong>Client: </strong>
                            {contratDetails.client && contratDetails.client.length > 0 ? (
                                <>
                                    {contratDetails.client.map((client, index) => (
                                        <span key={index}>
                                            {client.client}
                                            {index !== contratDetails.client.length - 1 && ', '}
                                        </span>
                                    ))}
                                </>
                            ) : (
                                'N/A'
                            )}
                        </p>
                        {contratDetails.client && contratDetails.client.length > 0 && (
                            <>
                                <p>Address: {contratDetails.client[0].adresse || 'N/A'}</p>
                                <p>Email: {contratDetails.client[0].email || 'N/A'}</p>
                                <p>Mobile: {contratDetails.client[0].mobile || 'N/A'}</p>
                                <p>Office: {contratDetails.client[0].office || 'N/A'}</p>
                                <p>Corporate: {contratDetails.client[0].corporate || 'N/A'}</p>

                                {contratDetails.client[0].attachement && (
                                    <img
                                        src={contratDetails.client[0].attachement}
                                        alt="Client Attachment"
                                        className="rounded "
                                    />
                                )}
                            </>
                        )}
                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>attachement : </strong> <img
                            src={contratDetails.attachement}
                            style={{ width: '200px', height: '200px' }}
                            alt='logo'
                            className='rounded' 
                            onClick={handleImageClick}
                            /></p>
                            {isFullScreen && (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
                                onClick={handleImageClick}
                            >
                                <img
                                    src={contratDetails.attachement}
                                    style={{ maxWidth: '90%', maxHeight: '90%', cursor: 'pointer' }}
                                    alt='logo'
                                />
                            </div>
                        )}
                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200">
                            <strong>Services : {contratDetails.service?.length || 0} </strong>
                        </p>
                    </div>

                    
                        </div>
                <div>
                </div>
            </div>

        </>)
}

export default ContratDetails