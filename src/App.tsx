import React, { useState, useEffect } from "react";
import { loadChampData } from "./api/dataProcessing";
import { ChampsState } from "./types/interfaces";

const App: React.FC = () => {
  const [champData, setChampData] = useState<ChampsState>({
    champs: {},
    champsImages: {},
    champsAbilities: {},
    champsAbilitiesImages: {},
  });
  const [isImport, setIsImport] = useState(false);

  useEffect(() => {
    loadChampData(setChampData);
  }, []);

  useEffect(() => {
    if (Object.keys(champData.champs).length > 0) {
      setIsImport(true);
      console.log(champData.champs.data);
    }
  }, [champData]);

  return (
    <div>
      {isImport &&
        Object.keys(champData.champs.data).map((champ) => (
          <div key={champ}>
            <h3>{champ}</h3>
            <p>{champData.champs.data[champ].title}</p>
            <img src={champData.champsImages[champ]} alt={champ} />
            <div>
              {champData.champsAbilitiesImages[champ].map(
                (abilityImage, index) => (
                  <>
                    <p>
                      {index + 1 === 1
                        ? "Q spell"
                        : index + 1 === 2
                        ? "W spell"
                        : index + 1 === 3
                        ? "E spell"
                        : "Ultimate"}
                    </p>
                    <img
                      key={index}
                      src={abilityImage}
                      onMouseOver={() =>
                        console.log(
                          champData.champsAbilities[champ][index].name
                        )
                      }
                      alt={`Ability ${
                        index + 1 === 1
                          ? "Q"
                          : index + 1 === 2
                          ? "W"
                          : index + 1 === 3
                          ? "E"
                          : "R"
                      }`}
                    />
                  </>
                )
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
