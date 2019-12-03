import React from 'react';
import styled from 'styled-components';
import StyledMovieList from './MovieList';

const MovieForm = ({ className, checkboxGroup ,movies, handleCheckboxCallback, handleFormCallback }) => {
    // const [checkboxGroup, setCheckboxGroup] = React.useState([false, false, false]);
    // const [showForm, setShowForm] = React.useState(true);
    let enableSubmit = false;

    for (const checked of checkboxGroup) {
        if(checked) enableSubmit = true;
    }

    // const handleCheckbox = (event) => {
    //     const index = parseInt(event.target.value, 10);
    //     //console.log("index: " + index);
    //     setCheckboxGroup([...checkboxGroup.slice(0, index), event.target.checked, ...checkboxGroup.slice(index + 1)]);
    // }

    // const handleShowForm = (event) => {
    //     setShowForm(() => {
    //         let showForm = event.target.checked;
    //         return showForm;
    //     });
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleFormCallback();
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
                    // if ( i === checkboxGroup.length - 1) setShowForm(false);
                }
                catch(error) {
                    // Output Networking Errors if any
                    console.log('Fetch API Error: ' + error);
                }
            })();
        }
    }

    // if (showForm) {
        //console.log("here if");
        return (
            <div>
                { movies.map((movie, index) => (
                    <React.Fragment key={movie.id}>
                        <label>
                            <input type="checkbox" name="checkboxGroup" value={index} checked={checkboxGroup[index]} onChange={handleCheckboxCallback} />
                            &nbsp;{movie.name}
                        </label>
                        <br />
                    </React.Fragment>
                )) }
                
                {enableSubmit ? (
                    <input type='button' value='Submit' onClick={handleSubmit}/>
                ) : (
                    <input type='button' value='Submit' disabled/>
                )}
            </div>
        );    
    // }
    // else {
    //     //console.log("here else");
    //     return <StyledMovieList />;
    // }
}

const StyledMovieForm = styled(MovieForm)`
font-weight: bold;
`;

export default StyledMovieForm;