

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type DogBreed = {
  id: string;
  attributes: {
    name: string;
    description: string;
    life: { min: number; max: number } | null;
    weight: { imperial: string; metric: string } | null;
    hypoallergenic: boolean | null;
  };
};

const App: React.FC = () => {
  const [breeds, setBreeds] = useState<DogBreed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://dogapi.dog/api/v2/breeds')
      .then(res => {
        setBreeds(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch dog breeds.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen bg-gray-100">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-2">
      <h1 className="text-2xl font-bold text-gray-100 text-center mb-6">Dog Breed Explorer</h1>
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        {breeds.map(breed => {
          const { name, description, life, weight, hypoallergenic } = breed.attributes;
          return (
            <div key={breed.id} className="bg-gray-800 border border-gray-700 rounded p-4">
              <h2 className="text-base font-bold text-blue-200 mb-1">{name}</h2>
              <p className="mb-2 text-gray-300 text-sm">{description || 'No description.'}</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li><span className="font-medium">Lifespan:</span> {life ? `${life.min} - ${life.max} years` : 'Unknown'}</li>
                <li><span className="font-medium">Weight:</span> {weight ? `${weight.imperial} lbs (${weight.metric} kg)` : 'Unknown'}</li>
                <li><span className="font-medium">Hypoallergenic:</span> {hypoallergenic === null ? 'Unknown' : hypoallergenic ? 'Yes' : 'No'}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
