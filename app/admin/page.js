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

      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <span style={styles.pageTag}>Admin</span>
          <h1 style={styles.pageTitle}>Manage Wallpapers</h1>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.loginCard}>
              <div style={styles.lockIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
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
                Authenticate
              </button>
            </div>
          </form>
        ) : (
          <section style={styles.gridSection}>
            <div style={{ ...styles.card, ...styles.addCard }} onClick={openNewModal}>
              <div style={styles.addIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div style={styles.addText}>Add Wallpaper</div>
            </div>

            {wallpapers.map((w, idx) => (
              <div
                key={`${w.anime}-${idx}`}
                style={{
                  ...styles.card,
                  backgroundImage: `linear-gradient(180deg, rgba(8,8,10,0.3), rgba(8,8,10,0.85)), url(${w.image})`,
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div
                  style={styles.cardOverlay}
                  onClick={() => openEditModal(idx)}
                >
                  <div style={styles.cardTitle}>{w.anime}</div>
                  <div style={styles.cardMeta}>{w.artist}</div>
                  <div style={styles.cardMeta}>{w.source}</div>
                  <div style={styles.cardDate}>{w.addedOn || '—'}</div>
                </div>
              </div>
            ))}
          </section>
        )}

        {message && (
          <div
            style={{
              marginTop: '1rem',
              padding: '0.85rem 1.15rem',
              backgroundColor: message.includes('Error') ? 'rgba(255, 45, 85, 0.08)' : 'rgba(74, 222, 128, 0.08)',
              border: `1px solid ${message.includes('Error') ? 'rgba(255, 45, 85, 0.2)' : 'rgba(74, 222, 128, 0.2)'}`,
              borderRadius: 'var(--radius-md)',
              color: message.includes('Error') ? '#ff6b8a' : '#4ade80',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.9rem',
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
              <div>
                <span style={styles.modalTag}>{isNew ? 'New' : 'Edit'}</span>
                <h2 style={styles.modalTitle}>{isNew ? 'Add Wallpaper' : 'Edit Wallpaper'}</h2>
              </div>
              <button onClick={closeModal} style={styles.closeButton} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="anime" style={styles.label}>Anime Title</label>
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
                <label htmlFor="image" style={styles.label}>Image URL</label>
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
                <label htmlFor="artist" style={styles.label}>Artist Name</label>
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
                <label htmlFor="artistLink" style={styles.label}>Artist Link</label>
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
                <label htmlFor="source" style={styles.label}>Source</label>
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
                <button type="button" onClick={closeModal} style={styles.secondaryButton}>
                  Cancel
                </button>
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
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    animation: 'cardReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
  },
  pageHeader: {
    marginBottom: '2rem',
  },
  pageTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    display: 'block',
    marginBottom: '0.5rem',
  },
  pageTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    color: 'var(--text-primary)',
    margin: 0,
    lineHeight: 1.1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  loginCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    maxWidth: '380px',
    padding: '2rem',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
  },
  lockIcon: {
    opacity: 0.5,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
  },
  input: {
    padding: '0.7rem 0.85rem',
    backgroundColor: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  button: {
    padding: '0.7rem 1.25rem',
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    transition: 'opacity 0.2s ease',
  },
  secondaryButton: {
    padding: '0.7rem 1.25rem',
    background: 'var(--bg-elevated)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  gridSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
  },
  card: {
    position: 'relative',
    minHeight: '200px',
    padding: '1rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    overflow: 'hidden',
  },
  addCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: 'var(--border-hover)',
    textAlign: 'center',
    gap: '0.75rem',
  },
  addIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '1.5px solid var(--border-hover)',
    display: 'grid',
    placeItems: 'center',
    color: 'var(--text-muted)',
  },
  addText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--text-muted)',
  },
  cardTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    color: 'var(--text-primary)',
  },
  cardMeta: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
  cardDate: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    marginTop: 'auto',
  },
  cardOverlay: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    cursor: 'pointer',
    marginTop: 'auto',
  },
  deleteButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '28px',
    height: '28px',
    backgroundColor: 'rgba(255, 45, 85, 0.85)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    zIndex: 10,
    backdropFilter: 'blur(4px)',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'grid',
    placeItems: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    width: '100%',
    maxWidth: '520px',
    maxHeight: '90vh',
    overflowY: 'auto',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border)',
    padding: '1.5rem',
    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  modalTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.6rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    display: 'block',
    marginBottom: '0.25rem',
  },
  modalTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '1.4rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: 'var(--text-primary)',
    margin: 0,
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: 'var(--radius-sm)',
    transition: 'color 0.2s ease',
  },
  modalActions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
  },
  imagePreview: {
    marginTop: '0.5rem',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-elevated)',
  },
  previewImage: {
    width: '100%',
    maxHeight: '180px',
    objectFit: 'contain',
    display: 'block',
  },
};
