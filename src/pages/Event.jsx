
import Navbar from '../components/NavbarComponent';
import TicketForm from '../components/TicketFormComponent';


function Event() {
    return (
        <div className="App">
            <div className="app-container px-3 py-3 px-md-4">

                <Navbar />

                <TicketForm />
            </div>
        </div>
    )

}

export default Event;