import React from 'react';
import StyledMovie from './Movie';
import StyledTitle from './Title';

const MovieList = () => {
    const [movies, setMovies] = React.useState([]);

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
    }, []);

    return (
        <div>
            <StyledTitle title="My Favourite Movies" subTitle="Marvel" />
             <ol>
            {movies.map(movie => (
                <StyledMovie key={movie.id}
                    name={movie.name} link={movie.link} color={movie.color} checked={movie.checked}
                />
            ))}
            </ol>
        </div>
        
    );
}

const StyledMovieList = styled(MovieList)`
background-color: papayawhip;
box-shadow: 0 0 5px gray;
padding: 10px;
`;

export default StyledMovieList;