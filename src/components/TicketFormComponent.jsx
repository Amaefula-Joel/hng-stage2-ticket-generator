import AvatarUpload from './AvatarUploadComponent';
import '../styles/ticketForm.css';
import { useState } from 'react';


function TicketForm() {

    const [page, setPage] = useState(0);
    const stepTitles = ['Ticket Selection', 'Attendee Details', 'Ready'];

    return (

        <div className='ticket-form-container mx-auto mt-3 sm:mt-11 p-12'>

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

                    <div className="form-body mt-8 p-6 b-dark-green text-white">


                        <form>
                            {/* step 1 starts */}
                            <div className={'form-step' + (page === 0 ? ' active' : '')}>

                                <div className='step1-header b-dark-green p-6 rounded-3xl mb-8'>
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
                                        <div className='radio-input grow-1'>
                                            <input type="radio" name="ticket-type" id="regular-ticket" className="hidden" />
                                            <label htmlFor="regular-ticket" className='cursor-pointer duration-200 b-light-green hover:bg-[#2C545B] p-3 rounded-xl block w-full'>

                                                <p className='mb-2 text-2xl'><strong>Free</strong></p>
                                                <p className='text-md font-light'>Regular Access</p>
                                                <p className='text-sm font-light'>20/52</p>

                                            </label>
                                        </div>
                                        <div className='radio-input grow-1'>
                                            <input type="radio" name="ticket-type" id="vip-ticket" className="hidden" />
                                            <label htmlFor="vip-ticket" className='cursor-pointer duration-200 b-light-green hover:bg-[#2C545B] p-3 rounded-xl block w-full'>

                                                <p className='mb-2 text-2xl'><strong>$150</strong></p>
                                                <p className='text-md font-light'>VIP Access</p>
                                                <p className='text-sm font-light'>20/52</p>

                                            </label>
                                        </div>
                                        <div className='radio-input grow-1'>
                                            <input type="radio" name="ticket-type" id="vvip-ticket" className="hidden" />
                                            <label htmlFor="vvip-ticket" className='cursor-pointer duration-200 b-light-green hover:bg-[#2C545B] p-3 rounded-xl block w-full'>

                                                <p className='mb-2 text-2xl'><strong>$150</strong></p>
                                                <p className='text-md font-light'>VVIP Access</p>
                                                <p className='text-sm font-light'>20/52</p>

                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-8">
                                    <p className='mt-7 text-sm mb-2'> Number of Tickets</p>

                                    <select className="bg-[#052228] p-3 b-dark-green rounded-xl w-full" name="number_of_ticket">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>

                                </div>



                            </div>
                            {/* step 1 ends */}


                            {/* step 2 starts */}
                            <div className={'form-step' + (page === 1 ? ' active' : '')}>

                                <AvatarUpload />


                                {/* line */}
                                <div className="bg-light-green h-[4px]"></div>

                                <div className="mb-8">
                                    <p className='mt-7 text-sm mb-2'>Enter Your name</p>

                                    <input type="text" className="bg-[#052228] p-3 b-dark-green rounded-xl w-full" name='name' />
                                </div>

                                <div className="mb-8">
                                    <p className='mt-7 text-sm mb-2'>Enter your email *</p>

                                    <input type="email" className="bg-[#052228] p-3 b-dark-green rounded-xl w-full" name='email_address' />
                                </div>

                                <div className="mb-8">
                                    <p className='mt-7 text-sm mb-2'>Special request?</p>

                                    <textarea className='bg-[#052228] p-3 b-dark-green rounded-xl w-full min-h-[127px]' name="request"></textarea>
                                </div>

                            </div>
                            {/* step 2 ends */}

                        </form>


                        {/* step 3 starts */}
                        <div className={'form-step' + (page === 2 ? ' active' : '')}>
                            <h3>Form Group three</h3>
                        </div>
                        {/* step 3 ends */}

                        <div className="form-footer flex justify-between flex-col sm:flex-row gap-2 mt-8">

                            <button onClick={() => {
                                if (page > 0) {
                                    setPage(page => page - 1);
                                }
                            }} className='cursor-pointer sm:px-6 px-4 py-3 text-sm sm:text-md b-light-green duration-200 hover:bg-lightest-green rounded-md font-semi-bold grow-1 order-2 sm:order-1'>Cancel</button>
                            <button onClick={() => {
                                if (page < 2) {
                                    setPage(page => page + 1);
                                }
                            }} className='cursor-pointer sm:px-6 px-4 py-3 text-sm sm:text-md b-light-green duration-200 bg-lightest-green rounded-md font-semi-bold grow-1 order-1 sm:order-2'>Next</button>
                        </div>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default TicketForm;