import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [pokemons, setPokemons] = useState([]);
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

    useEffect(() => {
        getURLs();
    }, []);

    return (
        <>
            <div>
                {pokemons.map(pokemon =>
                    <>
                        <div>{pokemon.name}</div>
                        <img src={pokemon.image} alt={pokemon.image} />
                    </>
                )}
            </div>
        </>
    );
};

export default App;
