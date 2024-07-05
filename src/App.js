import React from "react";
import "./App.css";
import names from "./names";
//import axios from 'axios';
const apiEndpoint = "https://api.dicebear.com/8.x/avataaars/svg";
const apiOptions = "&backgroundType=gradientLinear&mouth=smile";

// Define here the constants you need
// const backendUrl = "http://localhost:8000"; (or https maybee)
// const beneficiariesEndpoint = `${backendUrl}/...`;
// const loginEndpoint = `${backendUrl}/...`;

const getAvatar = name => `${apiEndpoint}?seed=${name}.svg${apiOptions}`;

function App() {
    const [registeredBeneficiaries, setRegisteredBeneficiaries] = React.useState(
        []
    );
    const fetchBeneficiaries = async () => {
        // Don't forget to import Axios, uncomment the line at the top of the file

        // Perform some login call
        // const loginResponse = await axios.post(...);

        // Authenticate your next request, or next requests
        // axios....

        // Get beneficiaries list from the backend
        // const response = await axios.get(...)

        // Set the response data in the local state
        // setRegisteredBeneficiaries(...);
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
