import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onAdoptPet(id) {
    const adopted = pets.map((pet) =>
      pet.id === id ? { ...pet, isAdopted: true } : pet
    );
    setPets(adopted);
  }

  function onChangeType(type) {
    setFilters({ type: type });
  }

  function onFindPetsClick() {
    let URL = "http://localhost:3001/pets";
    if (filters.type !== "all") {
      URL += `?type=${filters.type}`;
    }
    fetch(URL)
      .then((response) => response.json())
      .then((pets) => {
        setPets(pets);
      });
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
