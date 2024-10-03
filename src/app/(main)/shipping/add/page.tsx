//@ts-nocheck
"use client";

import React, { useState } from "react";
import Container from "@/components/global/Container";

interface WeightSection {
  id: number;
  from: number;
  to: number;
  price: number;
}

const AddShipping = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [name, setName] = useState("");
  const [weightSections, setWeightSections] = useState<WeightSection[]>([]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
    addWeightSection(); // Add a default row when the type is selected
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addWeightSection = () => {
    setWeightSections((prevSections) => [
      ...prevSections,
      { id: Date.now(), from: 0, to: 0, price: 0 },
    ]);
  };

  const deleteWeightSection = () => {
    setWeightSections([]);
    setSelectedType("");
  };

  const deleteRow = (id: number) => {
    setWeightSections((prevSections) => {
      const updatedSections = prevSections.filter(
        (section) => section.id !== id
      );

      // Check if the last row is being deleted
      if (prevSections.length === 1 && updatedSections.length === 0) {
        deleteWeightSection();
      }

      return updatedSections;
    });
  };
  return (
    <Container title={"Add Shipping"}>
      <div className="w-full flex flex-col">
        <label>Name:</label>
        <input
          placeholder="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        ></input>

        <label className="mt-4">Type:</label>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="" disabled>
            Select Option
          </option>
          <option value="By Weight (kg)">By Weight (kg)</option>
          <option value="By Distance (km)">By Distance (km)</option>
          <option value="By Price (Rps)">By Price (Rps)</option>
        </select>

        {selectedType && (
          <div className="mt-4">
            <div className="flex justify-between">
              <h2>{selectedType}</h2>
              <button
                className="ml-3 bg-blue-500 p-2 rounded-md text-white"
                onClick={() => deleteWeightSection()}
              >
                Delete
              </button>
            </div>
            {weightSections.map((section) => (
              <form key={section.id} className="mt-4">
                <label>From:</label>
                <input
                  className="ml-2"
                  type="number"
                  step=".01"
                  placeholder="range from"
                  onChange={(e) =>
                    setWeightSections((prevSections) =>
                      prevSections.map((s) =>
                        s.id === section.id
                          ? { ...s, from: parseInt(e.target.value, 10) }
                          : s
                      )
                    )
                  }
                ></input>

                <label className="ml-3">To:</label>
                <input
                  className="ml-2"
                  type="number"
                  placeholder="range to"
                  step=".01"
                  onChange={(e) =>
                    setWeightSections((prevSections) =>
                      prevSections.map((s) =>
                        s.id === section.id
                          ? { ...s, to: parseInt(e.target.value, 10) }
                          : s
                      )
                    )
                  }
                ></input>

                <label className="ml-3">Price:</label>
                <input
                  className="ml-2"
                  type="number"
                  placeholder="price in rps"
                  step=".01"
                  onChange={(e) =>
                    setWeightSections((prevSections) =>
                      prevSections.map((s) =>
                        s.id === section.id
                          ? { ...s, price: parseInt(e.target.value, 10) }
                          : s
                      )
                    )
                  }
                ></input>
                <button
                  className="ml-3 bg-red-500 p-2 rounded-md text-white"
                  onClick={() => deleteRow(section.id)}
                >
                  Delete
                </button>
              </form>
            ))}
            <div className="mt-4 w-full">
              <button
                className="ml-3 bg-blue-500 p-2 rounded-md text-white float-right"
                onClick={() => addWeightSection()}
              >
                Add
              </button>
            </div>
            <div className="mt-10">
              <button className="text-blue-700">Add More Types</button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AddShipping;
