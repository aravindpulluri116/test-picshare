import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);

  const backendURL = 'http://localhost:5000';

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!photo) return;

    const formData = new FormData();
    formData.append('photo', photo);

    try {
      await axios.post(`${backendURL}/api/photos/upload`, formData);
      fetchPhotos(); // refresh photo list
      setPhoto(null);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const fetchPhotos = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/photos`);
      setPhotos(res.data);
    } catch (err) {
      console.error('Fetching photos failed:', err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📷 Photo Sharing</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <hr />

      <h2>Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {photos.map((url, i) => (
          <div key={i}>
            <img
              src={`${backendURL}${url}`}
              alt="uploaded"
              width="200"
              style={{ borderRadius: '8px' }}
            />
            <br />
            <a href={`${backendURL}${url}`} download>
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
