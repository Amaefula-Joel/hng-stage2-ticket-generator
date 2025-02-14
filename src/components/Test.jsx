import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import localforage from "localforage";
import AvatarUpload from "./AvatarUploadComponent";
import "../styles/ticketForm.css";

const schema = yup.object().shape({
    ticketType: yup.string().required("Please select a ticket type."),
    numberOfTickets: yup.string().required("Please select the number of tickets."),
    name: yup.string().required("Name is required."),
    email: yup.string().email("Invalid email").required("Email is required."),
    request: yup.string(),
    avatar: yup.string().required("Please upload an avatar."),
});

function TicketForm() {
    const [page, setPage] = useState(0);
    const stepTitles = ["Ticket Selection", "Attendee Details", "Ready"];

    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            ticketType: "",
            numberOfTickets: "1",
            name: "",
            email: "",
            request: "",
            avatar: "",
        },
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
        if (page === 0 && !getValues("ticketType")) return alert("Select a ticket type.");
        if (page === 1 && (!getValues("name") || !getValues("email") || !getValues("avatar"))) {
            return alert("Complete all required fields before proceeding.");
        }
        setPage((prev) => prev + 1);
    };

    return (
        <div className="ticket-form-container mx-auto mt-3 sm:mt-11 p-12">
            <div className="step-container">
                <div>
                    <div className="form-header">
                        <div className="flex justify-between items-center text-white mb-2">
                            <h2 className="heading mb-0">{stepTitles[page]}</h2>
                            <p className="mb-0">Step {page + 1}/3</p>
                        </div>
                        <div className="progress-bar">
                            <div style={{ width: `calc(${page + 1} * 33.3333%)` }} className="duration-300"></div>
                        </div>
                    </div>

                    <div className="form-body mt-8 p-6 b-dark-green text-white">
                        <form>
                            {/* Step 1: Ticket Selection */}
                            {page === 0 && (
                                <div className="form-step active">
                                    <p className="mt-7 text-sm mb-2">Select Ticket Type:</p>
                                    <div className="flex gap-4">
                                        {["Free", "$150 VIP", "$250 VVIP"].map((type, index) => (
                                            <label key={index} className="cursor-pointer p-3 rounded-xl bg-[#2C545B] w-full">
                                                <input
                                                    type="radio"
                                                    {...register("ticketType")}
                                                    value={type}
                                                    className="hidden"
                                                />
                                                <p className="mb-2 text-2xl"><strong>{type}</strong></p>
                                            </label>
                                        ))}
                                    </div>
                                    <p className="text-red-400 text-sm">{errors.ticketType?.message}</p>

                                    <p className="mt-7 text-sm mb-2">Number of Tickets</p>
                                    <select {...register("numberOfTickets")} className="bg-[#052228] p-3 b-dark-green rounded-xl w-full">
                                        {[1, 2, 3].map((num) => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Step 2: Attendee Details */}
                            {page === 1 && (
                                <div className="form-step active">
                                    <AvatarUpload setValue={setValue} />

                                    <p className="mt-7 text-sm mb-2">Enter Your Name</p>
                                    <input {...register("name")} className="bg-[#052228] p-3 b-dark-green rounded-xl w-full" />
                                    <p className="text-red-400 text-sm">{errors.name?.message}</p>

                                    <p className="mt-7 text-sm mb-2">Enter Your Email *</p>
                                    <input {...register("email")} className="bg-[#052228] p-3 b-dark-green rounded-xl w-full" />
                                    <p className="text-red-400 text-sm">{errors.email?.message}</p>

                                    <p className="mt-7 text-sm mb-2">Special Request?</p>
                                    <textarea {...register("request")} className="bg-[#052228] p-3 b-dark-green rounded-xl w-full min-h-[127px]"></textarea>
                                </div>
                            )}

                            {/* Step 3: Ready */}
                            {page === 2 && <h3>Form Group three</h3>}
                        </form>

                        <div className="form-footer flex justify-between mt-8">
                            {page > 0 && (
                                <button onClick={() => setPage((prev) => prev - 1)} className="cursor-pointer px-6 py-3 text-md">
                                    Back
                                </button>
                            )}
                            {page < 2 && (
                                <button onClick={onNext} className="cursor-pointer px-6 py-3 text-md bg-green-500">
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketForm;
