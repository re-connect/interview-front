import React from "react";
import "./App.css";
import names from "./names";
import axios from 'axios';

const apiEndpoint = "https://api.dicebear.com/8.x/avataaars/svg";

const backendUrl = "http://localhost:8000"; 
const loginEndpoint = `${backendUrl}/login`;
const beneficiariesEndpoint = `${backendUrl}/beneficiaries`;

const getAvatar = name => `${apiEndpoint}?seed=${name}`;

function App() {
    const [registeredBeneficiaries, setRegisteredBeneficiaries] = React.useState([]);

    const fetchBeneficiaries = async () => {
        // Perform login call
        const loginResponse = await axios.post(loginEndpoint, {
            email: 'tester@gmail.com', // replace with actual username
            password: 'I@mTheT€ster' // replace with actual password
        });

        // Authenticate your next request
        axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.token}`;

        // Get beneficiaries list from the backend
        const response = await axios.get(beneficiariesEndpoint);

        // Set the response data in the local state
        setRegisteredBeneficiaries(response.data);
    };

    React.useEffect(() => {
        fetchBeneficiaries();
    }, []);
    const beneficiaryNames = [...Array(12).keys()].map(number => ({
        name: names[Math.floor(Math.random() * names.length)]
    }));

    return (
        <div className="App">
            <header className="App-header">
                <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
                <hr/>
                <h3>Personnes stockées en base</h3>
                <div className="Beneficiaries-list">
                    {registeredBeneficiaries.map((beneficiary) => (
                        <div className="Beneficiary-card" key={beneficiary.id}>
                            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name}/>
                            <span>{beneficiary.name}</span>
                        </div>
                    ))}
                </div>
                <hr/>
                <h3>Personnes non stockées</h3>
                <div className="Beneficiaries-list">
                    {beneficiaryNames.map((beneficiary, index) => (
                        <div className="Beneficiary-card" key={beneficiary.name + index}>
                            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name}/>
                            <span>{beneficiary.name}</span>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;
