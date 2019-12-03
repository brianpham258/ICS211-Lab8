import React from 'react';
import styled from 'styled-components';
import StyledMovieForm from './MovieForm';
import StyledMovieList from './MovieList';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

const App = () => {
    const [movies, setMovies] = React.useState([]);
    const [checkboxGroup, setCheckboxGroup] = React.useState([false, false, false]);
    const [showForm, setShowForm] = React.useState(true);

    React.useEffect( () => {
        (async () => {
            try {
                // Make an API Request and store the Response
                const response = await fetch('http://192.168.33.10:3004/movies');

                // Output HTTP Errors if any
                if(!response.ok) throw Error(response.status + ': ' + response.statusText);

                // extract the JSON from the body of the Response
                const result = await response.json();

                // update the state variable
                setMovies(result);
            }
            catch(error) {
                // Output Networking Errors if any
                console.log('Fetch API Error: ' + error);
            }
        })();
    }, [showForm]);

    const handleCheckbox = (event) => {
        const index = parseInt(event.target.value, 10);
        //console.log("index: " + index);
        setCheckboxGroup([...checkboxGroup.slice(0, index), event.target.checked, ...checkboxGroup.slice(index + 1)]);
    }

    const handleForm = () => {
        for(let i = 0; i < checkboxGroup.length; i++) {
            (async () => {
                try {
                    const response = await fetch(`http://192.168.33.10:3004/movies/${i+1}`, {
                        //JSON object for options
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "checked": checkboxGroup[i]
                        })
                    }); // close fetch call
                    console.log("checkboxGroup[" + i + "]: " + checkboxGroup[i]);
                    console.log(response);

                    // Output HTTP Errors if any
                    if(!response.ok) throw Error(response.status + ': ' + response.statusText);

                    // change status of showForm to false
                    if ( i === checkboxGroup.length - 1) setShowForm(false);
                }
                catch(error) {
                    // Output Networking Errors if any
                    console.log('Fetch API Error: ' + error);
                }
            })();
        }
    }

    return (
        <Router>
            <Switch>
                <Route 
                    exact path="/"
                    render={ () => {
                        setShowForm(true);
                        return (
                            <StyledMovieForm 
                                checkboxGroup={checkboxGroup} 
                                movies={movies} 
                                handleCheckboxCallback={handleCheckbox} 
                                handleFormCallback={handleForm} 
                            />
                        );
                    }} 
                />
                <Route path="/results">
                    <StyledMovieList movies={movies} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;