import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [cardClicked, setCardClicked] = useState([]);
    const serverUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=12';

    async function getURLs() {
        const resUrls = await fetch(serverUrl);
        const data = await resUrls.json();

        setPokemons(await Promise.all(
            data.results.map(async (p) => {
                const res = await fetch(p.url);
                const pokeData = await res.json();

                return {
                    id: pokeData.id,
                    name: pokeData.name,
                    image: pokeData.sprites.other['official-artwork'].front_default,
                };
            })
        ));
    };

    function clicked(e) {
        let pokemonId = parseInt(e.target.id);
        let exist = cardClicked.some(num => pokemonId === num.id);

        if (!exist) {
            setScore(score => score + 1);
            setCardClicked([...cardClicked, { id: pokemonId }]);
        } else {
            if (score !== 0) {
                setHighScore(score);
            }
            setScore(0);
            setCardClicked([]);
        }
    }

    useEffect(() => {
        getURLs();
    }, []);

    return (
        <>
            <div className='score-container'>
                <table>
                    <tbody>
                        <tr className='score'>
                            <th>Score</th>
                            <th>High Score</th>
                        </tr>
                        <tr>
                            <td>{score}</td>
                            <td>{highScore}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='pokemon-container'>
                {pokemons.map(pokemon =>
                    <div className='pokemon' onClick={clicked}>
                        <img id={pokemon.id} src={pokemon.image} alt={pokemon.image} />
                        <p>{pokemon.name}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
