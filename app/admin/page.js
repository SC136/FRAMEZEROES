'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function Admin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [animes, setAnimes] = useState([]);
  const [wallpapers, setWallpapers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [suggestions, setSuggestions] = useState({
    anime: [],
    artist: [],
    artistLink: [],
    source: [],
  });
  const [formData, setFormData] = useState({
    anime: '',
    image: '',
    artist: '',
    artistLink: '',
    source: '',
    addedOn: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const loadData = async () => {
    const res = await fetch('/api/wallpapers');
    const data = await res.json();
    setAnimes(data.animes || []);
    setWallpapers(data.wallpapers || []);
    const uniq = (key) => [...new Set((data.wallpapers || []).map(w => w[key]).filter(Boolean))];
    setSuggestions({
      anime: uniq('anime'),
      artist: uniq('artist'),
      artistLink: uniq('artistLink'),
      source: uniq('source'),
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginPassword) return;
    setAuthToken(loginPassword);
    setIsAuthenticated(true);
    setLoginPassword('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const openNewModal = () => {
    setIsNew(true);
    setEditIndex(null);
    setFormData({
      anime: '',
      image: '',
      artist: '',
      artistLink: '',
      source: '',
      addedOn: '',
    });
    setMessage('');
    setShowModal(true);
  };

  const openEditModal = (index) => {
    const w = wallpapers[index];
    if (!w) return;
    setIsNew(false);
    setEditIndex(index);
    setFormData({ ...w });
    setMessage('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLoading(false);
    setMessage('');
  };

  const handleDelete = async (index, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this wallpaper?')) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/wallpapers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-password': authToken,
        },
        body: JSON.stringify({ index }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.error}`);
        return;
      }

      setMessage('Wallpaper deleted successfully!');
      await loadData();

      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!authToken) {
      setMessage('Error: Not authenticated');
      setLoading(false);
      return;
    }

    try {
      const isEdit = !isNew && editIndex !== null;
      const payload = isEdit
        ? {
          index: editIndex,
          wallpaper: {
            ...formData,
            addedOn: formData.addedOn || wallpapers[editIndex]?.addedOn || new Date().toISOString().split('T')[0],
          },
        }
        : formData;

      const response = await fetch(isEdit ? '/api/wallpapers' : '/api/add-wallpaper', {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-password': authToken,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.error}`);
        return;
      }

      setMessage(isEdit ? 'Wallpaper updated successfully!' : 'Wallpaper added successfully!');
      setFormData({
        anime: '',
        image: '',
        artist: '',
        artistLink: '',
        source: '',
        addedOn: '',
      });
      setEditIndex(null);
      setIsNew(true);

      await loadData();
      setShowModal(false);

      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header animes={animes} />

      <main style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1>Admin Panel</h1>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter admin password"
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        ) : (
          <section style={styles.gridSection}>
            <div style={{ ...styles.card, ...styles.addCard }} onClick={openNewModal}>
              <div style={styles.addIcon}>+</div>
              <div>Add New Wallpaper</div>
            </div>

            {wallpapers.map((w, idx) => (
              <div
                key={`${w.anime}-${idx}`}
                style={{
                  ...styles.card,
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.75)), url(${w.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <button
                  style={styles.deleteButton}
                  onClick={(e) => handleDelete(idx, e)}
                  aria-label="Delete"
                  title="Delete wallpaper"
                >
                  ✕
                </button>
                <div
                  style={styles.cardOverlay}
                  onClick={() => openEditModal(idx)}
                >
                  <div style={styles.cardTitle}>{w.anime}</div>
                  <div style={styles.cardMeta}>{w.artist}</div>
                  <div style={styles.cardMeta}>{w.source}</div>
                  <div style={styles.cardMeta}>Added: {w.addedOn || '—'}</div>
                </div>
              </div>
            ))}
          </section>
        )}

        {message && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: message.includes('Error') ? '#4a1f1f' : '#1f4a1f',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            {message}
          </div>
        )}
      </main>

      {isAuthenticated && showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>{isNew ? 'Add Wallpaper' : 'Edit Wallpaper'}</h2>
              <button onClick={closeModal} style={styles.closeButton} aria-label="Close">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="anime">Anime Title:</label>
                <input
                  id="anime"
                  type="text"
                  name="anime"
                  value={formData.anime}
                  onChange={handleInputChange}
                  placeholder="e.g., Attack on Titan"
                  list="anime-suggestions"
                  style={styles.input}
                  required
                />
                <datalist id="anime-suggestions">
                  {suggestions.anime.map(option => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="image">Image URL:</label>
                <input
                  id="image"
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  style={styles.input}
                  required
                />
                {formData.image && (
                  <div style={styles.imagePreview}>
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={styles.previewImage}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="artist">Artist Name:</label>
                <input
                  id="artist"
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  placeholder="e.g., Artist One"
                  list="artist-suggestions"
                  style={styles.input}
                  required
                />
                <datalist id="artist-suggestions">
                  {suggestions.artist.map(option => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="artistLink">Artist Link:</label>
                <input
                  id="artistLink"
                  type="url"
                  name="artistLink"
                  value={formData.artistLink}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  list="artist-link-suggestions"
                  style={styles.input}
                  required
                />
                <datalist id="artist-link-suggestions">
                  {suggestions.artistLink.map(option => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="source">Source:</label>
                <input
                  id="source"
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="e.g., Unsplash, Pixiv"
                  list="source-suggestions"
                  style={styles.input}
                  required
                />
                <datalist id="source-suggestions">
                  {suggestions.source.map(option => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>

              <div style={styles.modalActions}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.button,
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading
                    ? (isNew ? 'Adding...' : 'Updating...')
                    : (isNew ? 'Add Wallpaper' : 'Update Wallpaper')}
                </button>
                <button type="button" onClick={closeModal} style={styles.secondaryButton}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    marginTop: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#eaeaea',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  secondaryButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  gridSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  card: {
    position: 'relative',
    minHeight: '200px',
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #333',
    backgroundColor: '#111',
    color: '#eaeaea',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    cursor: 'pointer',
    transition: 'transform 0.15s ease, border-color 0.15s ease',
  },
  addCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: '#444',
    textAlign: 'center',
  },
  addIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: '2px solid #555',
    display: 'grid',
    placeItems: 'center',
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: '1.05rem',
  },
  cardMeta: {
    fontSize: '0.9rem',
    opacity: 0.85,
  },
  cardOverlay: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    cursor: 'pointer',
  },
  deleteButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(200, 30, 30, 0.85)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    zIndex: 10,
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    display: 'grid',
    placeItems: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    width: '100%',
    maxWidth: '520px',
    backgroundColor: '#0f0f0f',
    borderRadius: '10px',
    border: '1px solid #333',
    padding: '1.25rem 1.5rem',
    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#ccc',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  modalActions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
  },
  imagePreview: {
    marginTop: '0.75rem',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #333',
    backgroundColor: '#1a1a1a',
  },
  previewImage: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'contain',
    display: 'block',
  },
};
