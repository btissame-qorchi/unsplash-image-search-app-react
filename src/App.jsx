import { useState } from "react";
import "./App.css";

const ACCESS_KEY = "AmrQS5i7Z4lHYIXSIUvl3tKlCi2l3PrOlVy9HahOTGs";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction de recherche d'images
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      setImages(data.results);
    } catch (err) {
      setError("Error :" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h3>Search something awesome!</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="image-gallery">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="image-item">
              <img src={image.urls.small} alt={image.alt_description} />
            </div>
          ))
        ) : (
          <p>
            Hmm, nothing here. Type something fun and let&apos;s find some cool
            images!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
