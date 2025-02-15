import AvatarUpload from './AvatarUploadComponent';
import TicketDisplay from './TicketDisplayComponent';
import SuccessMessage from './SuccessMessage';
import '../styles/ticketForm.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFileContext } from "../FileContext";

import localforage from "localforage";



function TicketForm() {
    const [page, setPage] = useState(2);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [cloudImage, setCloudImage] = useState(null);


    const { avatarFile } = useFileContext();


    const stepTitles = ['Ticket Selection', 'Attendee Details', 'Ready'];

    const schema = yup.object().shape({
        ticket_type: yup.string().required('Please select a ticket type.'),
        number_of_ticket: yup.string().required('Please select the number of tickets.'),
        name: yup.string().required('Name is required.'),
        avatar: yup.string().required('Please upload an avatar.'),
        email_address: yup.string().email('Invalid email').required('Email is required.'),
        request: yup.string(),
    });

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            ticket_type: '',
            number_of_ticket: '1',
            name: '',
            avatar: '',
            email_address: '',
            request: '',
        }
    });


    // Watch form values for changes
    const formValues = watch();

    // Load saved data from localForage on mount
    useEffect(() => {
        localforage.getItem("ticketForm").then((savedData) => {
            if (savedData) {
                Object.keys(savedData).forEach((key) => {
                    setValue(key, savedData[key]);
                });
            }
        });
    }, [setValue]);

    // Save form data to localForage on change
    useEffect(() => {
        localforage.setItem("ticketForm", formValues);
    }, [formValues]);

    const onNext = () => {
        if (page === 0 && (!getValues("ticket_type") || !getValues("number_of_ticket"))) return alert("Fill the required fields.");
        if (page === 1 && (!getValues("name") || !getValues("email_address") || !getValues("avatar"))) {

            // if there are errors in the form
            if (Object.keys(errors).length > 0) {
                return alert("Complete all required fields with valid inputs before proceeding.");
            }
            return alert("Complete all required fields before proceeding.");
        }
        if (page === 1 && Object.keys(errors).length === 0) {
            uploadToCloudinary(avatarFile)
        }
        if (page === 0) {
            setPage((prev) => prev + 1);
        }
        console.log(avatarFile)

    }


    const clearLocalForageData = async () => {
        setUploadSuccess(false);
        reset();

        await localforage.removeItem("ticketForm");
        await localforage.removeItem("avatar");
        await localforage.removeItem("file");
        window.location.reload();
    }

    const uploadToCloudinary = async (file) => {
        if (!file) return alert("No image selected!");

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ticketGeneratorPreset");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dkx37dt3i/image/upload", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            setCloudImage(data.secure_url);
            setUploadSuccess(true);


        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed!");
        } finally {
            setUploading(false);
        }
    };


    return (

        <div className='ticket-form-container mx-auto mt-3 sm:mt-11 sm:p-12 p-6 sm:bg-[#041E23] bg-[#08252B]'>

            <div className='step-container'>

                <div>
                    <div className="form-header">
                        <div className="flex justify-between items-center text-white mb-2">
                            <h2 className='heading mb-0'>{stepTitles[page]}</h2>

                            <p className='mb-0'>Step {page + 1}/3</p>
                        </div>

                        <div className="progress-bar">
                            <div style={{ 'width': `calc(${page + 1} * 33.3333%)` }} className='duration-300'></div>
                        </div>
                    </div>

                    <div className="form-body mt-8 sm:p-6 b-dark-green text-white bg-[#08252B]">


                        <form>
                            {uploading && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                </div>
                            )}
                            {uploadSuccess && (
                                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
                                    <SuccessMessage />
                                </div>
                            )}

                            {uploading && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                </div>
                            )}
                            {uploadSuccess && (
                                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
                                    <SuccessMessage />
                                </div>
                            )}

                            {/* step 1 starts */}
                            <div className={'form-step' + (page === 0 ? ' active' : '')}>

                                <div className='step1-header b-dark-green sm:p-6 p-4 rounded-3xl mb-8'>
                                    <div className="mx-auto max-w-sm text-center">
                                        <h1 className='main-title  sm:text-[62px] text-[48px] text-center '>Techember Fest ”25</h1>
                                        <p className='sm:mb-2 mb-7'>Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>

                                        <div className="flex flex-col sm:flex-row sm:gap-3 gap-2">
                                            <p>📍 [Event Location]</p>
                                            <span className='hidden sm:block'>||</span>
                                            <p>March 15, 2025 | 7:00 PM</p>
                                        </div>
                                    </div>

                                </div>

                                {/* line */}
                                <div className="bg-light-green h-[4px]"></div>

                                <div className="mb-8">
                                    <p className='mt-7 text-sm mb-2'>Select Ticket Type:</p>

                                    <div className="bg-[#052228] p-4 b-dark-green rounded-xl flex flex-col sm:flex-row gap-4">
                                        <div className='radio-input flex-1'>
                                            <input type="radio" name="ticket_type" value="free" id="regular-ticket" className="hidden" {...register("ticket_type")} />
                                            <label htmlFor="regular-ticket" className='cursor-pointer duration-200 b-light-green hover:bg-[#2C545B] p-3 rounded-xl block w-full'>

                                                <p className='mb-2 text-2xl'><strong>Free</strong></p>
                                                <p className='text-md font-light'>Regular Access</p>
                                                <p className='text-sm font-light'>20/52</p>

                                            </label>
                                        </div>
                                        <div className='radio-input flex-1'>
                                            <input type="radio" name="ticket_type" value="vip 150" id="vip-ticket" className="hidden" {...register("ticket_type")} />
                                            <label htmlFor="vip-ticket" className='cursor-pointer duration-200 b-light-green hover:bg-[#2C545B] p-3 rounded-xl block w-full'>

                                                <p className='mb-2 text-2xl'><strong>$150</strong></p>
                                                <p className='text-md font-light'>VIP Access</p>
                                                <p className='text-sm font-light'>20/52</p>

                                            </label>
                                        </div>
                                        <div className='radio-input flex-1'>
                                            <input type="radio" name="ticket_type" value="vvip 150" id="vvip-ticket" className="hidden" {...register("ticket_type")} />
                                            <label htmlFor="vvip-ticket" className='cursor-pointer duration-200 b-light-green hover:bg-[#2C545B] p-3 rounded-xl block w-full'>

                                                <p className='mb-2 text-2xl'><strong>$150</strong></p>
                                                <p className='text-md font-light'>VVIP Access</p>
                                                <p className='text-sm font-light'>20/52</p>

                                            </label>

                                        </div>
                                    </div>

                                    <p className="text-red-400 text-sm mt-3">{errors.ticket_type?.message}</p>



                                    {/* <button type='button' onClick={() => {console.log(imageFile);
                                    } } className='text-gray-100'>test</button> */}
                                </div>
                                <div className="mb-8">
                                    <p className='mt-7 text-sm mb-2'> Number of Tickets</p>

                                    <select className="bg-[#052228] p-3 b-dark-green rounded-xl w-full" name="number_of_ticket" {...register("number_of_ticket")}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>

                                    <p className="text-red-400 text-sm mt-3">{errors.number_of_ticket?.message}</p>

                                </div>



                            </div>
                            {/* step 1 ends */}


                            {/* step 2 starts */}
                            <div className={'form-step' + (page === 1 ? ' active' : '')}>

                                <AvatarUpload setValue={setValue} />


                                {/* line */}
                                <div className="bg-light-green h-[4px]"></div>

                                <div className="mb-8">
                                    <p className='mt-7 text-sm mb-2'>Enter Your name</p>

                                    <input type="text" className="bg-[#052228] p-3 b-dark-green rounded-xl w-full" name='name' {...register("name")} />

                                    <p className="text-red-400 text-sm mt-3">{errors.name?.message}</p>
                                </div>

                                <div className="mb-8">
                                    <p className='mt-7 text-sm mb-2'>Enter your email *</p>

                                    <input type="email" className="bg-[#052228] p-3 b-dark-green rounded-xl w-full" name='email_address' {...register("email_address")} />

                                    <p className="text-red-400 text-sm mt-3">{errors.email_address?.message}</p>
                                </div>

                                <div className="mb-8">
                                    <p className='mt-7 text-sm mb-2'>Special request?</p>

                                    <textarea className='bg-[#052228] p-3 b-dark-green rounded-xl w-full min-h-[127px]' name="request" {...register("request")} ></textarea>

                                    <p className="text-red-400 text-sm mt-3">{errors.request?.message}</p>
                                </div>

                            </div>
                            {/* step 2 ends */}

                        </form>


                        {/* step 3 starts */}
                        <div className={'form-step' + (page === 2 ? ' active' : '')}>

                            <h3 className='text-center mb-3 text-2xl'>Your Ticket is Booked!</h3>

                            <p className='text-center mb-16 text-sm'>Check your email for a copy or you can download</p>

                            <TicketDisplay />
                        </div>
                        {/* step 3 ends */}

                        <div className="form-footer flex justify-between flex-col sm:flex-row gap-2 mt-8">

                            {/* back button */}
                            {page === 1 && (
                                <button onClick={() => {
                                    if (page > 0) {
                                        setPage(page => page - 1);
                                    }
                                }} className='cursor-pointer sm:px-6 px-4 py-3 text-sm sm:text-md b-light-green duration-200 hover:bg-lightest-green rounded-md font-semi-bold flex-1 order-2 sm:order-1'>Back</button>
                            )}

                            {/* cancel or back to beginning button */}
                            {(page === 0 || page === 2) && (

                                <button
                                    className="cursor-pointer sm:px-6 px-4 py-3 text-sm sm:text-md b-light-green duration-200 hover:bg-lightest-green rounded-md font-semi-bold flex-1 order-2 sm:order-1"
                                    onClick={clearLocalForageData}
                                >
                                    <span>
                                        {page === 0 ? 'cancel' : 'Book Another Ticket'}
                                    </span>
                                </button>
                            )}

                            {/* next button */}
                            <button onClick={onNext} className='cursor-pointer sm:px-6 px-4 py-3 text-sm sm:text-md b-light-green duration-200 bg-lightest-green rounded-md font-semi-bold flex-1 order-1 sm:order-2'>
                                <span>
                                    {page === 0 ? 'Next' : 'Get My Free Ticket'}
                                </span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default TicketForm;
