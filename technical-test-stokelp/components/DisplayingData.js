import React, { useState, useEffect } from "react";
import bandsData from "../public/data/metal_bands_2017.json";

export default function BandsList({}) {
  const [bands, setBands] = useState([]);
  const [allStyles, setAllStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");

  useEffect(() => {
    // Sort band_name in alphabetical order
    const sortedBands = bandsData.sort((a, b) => {
      if (a.band_name < b.band_name) {
        return -1;
      }
      if (a.band_name > b.band_name) {
        return 1;
      }
      return 0;
    });
    console.log("sortedBands", sortedBands);

    setBands(sortedBands);

    // Extract all styles
    const getAllStyles = (data) => {
      const styles = [];
      for (const band of data) {
        if (band.style) {
          const styleList = band.style.split(",");
          for (const style of styleList) {
            if (!styles.includes(style)) {
              styles.push(style);
            }
          }
        }
      }
      return styles;
    };

    const allStyles = getAllStyles(bandsData);
    console.log("uniqueStyles", allStyles);

    // Sort styles alphabetically
    const sortedStyles = allStyles.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    console.log("sortedStyles", sortedStyles);
    setAllStyles(sortedStyles);
  }, []);

  // Filter bands with the selected style
  const filteredBands = bands.filter((band) => {
    if (!selectedStyle) {
      return bands; // Include all bands when no style is selected
    }
    return band.style && band.style.includes(selectedStyle);
  });

  return (
    <div className="mainDiv">
      <h1>Band List</h1>
      <div className="styleList">
        <label htmlFor="styleFilter">Filter by Style:</label>
        <select
          name="styles"
          id="styleSelect"
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
        >
          <option value="">All Styles</option>
          {allStyles.map((style, index) => (
            <option key={index} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>
      <ul className="bandList">
        {filteredBands.map((band, index) => (
          <li key={index}>
            <strong>{band.band_name}</strong> - {band.origin}
          </li>
        ))}
      </ul>
    </div>
  );
}
