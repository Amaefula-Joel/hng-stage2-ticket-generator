function TicketDisplay({ formData, img }) {
    return (
        <div className="mx-auto p-[20px] max-w-[300px] relative">

            <div className="absolute inset-0 z-20">
                <img src="ticket.png" alt="ticket background" className="block w-full h-full" />
            </div>

            <div className="max-w-[300px] relative z-30">
                <div className="">
                    <div className="mx-auto p-4 b-light-green rounded-xl">

                        <h1 className='main-title   text-[34px] text-center '>Techember Fest ”25</h1>

                        <div className="flex flex-col items-center gap-2 text-center mb-6">
                            <p className="text-sm">📍 04 Rumens road, Ikoyi, Lagos</p>
                            <p className="text-sm">March 15, 2025 | 7:00 PM</p>
                        </div>

                        <div>
                            <img src={img} alt="kvj" className="mx-auto rounded-2xl" style={{
                                width: "140px",
                                height: "140px",
                                border: "4px solid rgba(36, 160, 181, 0.5)", objectFit: "cover"
                            }} />
                        </div>

                        <div className="grid grid-cols-2 p-1 bg-[#08343C] mt-5 rounded-md">
                            <div className=" p-1">
                                <p className="text-gray-400 text-[10px]">Enter your name</p>
                                <p className="text-gray-200 text-sm">{formData.name}</p>
                            </div>
                            <div className=" p-1">
                                <p className="text-gray-400 text-[10px]">Enter your email *</p>
                                <p className="text-gray-200 text-sm truncate">{formData.email_address}</p>
                            </div>
                            <div className=" p-1">
                                <p className="text-gray-400 text-[10px]">Ticket Type:</p>
                                <p className="text-gray-200 text-sm">{formData.ticket_type}</p>
                            </div>
                            <div className=" p-1">
                                <p className="text-gray-400 text-[10px]">Ticket for :</p>
                                <p className="text-gray-200 text-sm">{formData.ticket_for}</p>
                            </div>
                            <div className="col-span-2 p-1">
                                <p className="text-gray-400 text-[10px]">Special request?</p>
                                <p className="text-gray-200 text-sm">{formData.request}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-9">
                        <img src="Barcode.png" alt="bar code" />

                    </div>
                </div>
            </div>


        </div>

    )
}

export default TicketDisplay