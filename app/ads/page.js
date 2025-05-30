'use client';

import { use, useEffect, useState } from 'react';
import { ApiClient } from '../../apiClient/apiClient';

export default function AdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editAd, setEditAd] = useState(null);
  const [editForm, setEditForm] = useState ({
    title: '',
    artist: '',
    genre: '',
    age: '',
    location: '',
    date: '',
    time: '',
    imageURL: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const apiClient = new ApiClient();
        if (!apiClient.isLoggedIn()) {
          window.location.href = '/unauthorized';
          return;
        }
        const response = await apiClient.getAds();
        setAds(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch advertisements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
    const handleLogout = async () => {
    const apiClient = new ApiClient();
    await apiClient.logout();
    }
    const handleDelete = async (id) =>{
      const apiClient = new ApiClient();
      try{
      await apiClient.removeAd(id);
      setAds((prevAds) => prevAds.filter(ad => ad._id !== id));
      }catch (err){
        const message = err.response?.data?.message || "Failed to delete ad.";
        alert(message);
        
      }
    }
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button onClick={handleLogout} className="text-purple-400 rounded-md hover:bg-red-300 text-white">Logout</button>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Browse Advertisements</h1>
      
      {ads.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No advertisements found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div 
              key={ad._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {ad.title}
                </h2>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {ad.artist}
                </h2>
                {ad.imageURL && (
                  <img src={ad.imageURL} alt={ad.title} className='h-64 w-full rounded-sm my-2'/>
                )}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-5">
                  {ad.description}
                </p>
                <div className='grid grid-cols-2'>
                  <p className="text-md text-gray-900 dark:text-white mb-2">
                   &#127926; {ad.genre}
                  </p>
                  <p className="text-md text-gray-900 dark:text-white mb-2">
                   &#128286; {ad.age}
                  </p>
                  <p className="text-md text-gray-900 dark:text-white mb-2">
                   &#128205; {ad.location}
                  </p>
                  <p className="text-md text-gray-900 dark:text-white mb-2">
                   &#128197; {ad.date}
                  </p>
                  <p className="text-md text-gray-900 dark:text-white mb-2">
                   &#128337; {ad.time}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${ad.price}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(ad.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
                <form action="/api/contact" method="POST">
                  <input type="hidden" name="adId" value={ad.id} />
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Buy Ticket
                  </button>
                </form>
              </div>
              <button onClick ={() => {
                  setEditAd(ad);
                  setEditForm({title: ad.title, artist: ad.artist, genre: ad.genre, age: ad.age, location: ad.location, date: ad.date, time: ad.time, description: ad.description, price: ad.price});
                }} className='text-sm'>&#128395; Edit</button>
                <button onClick={() => handleDelete(ad._id)}>Delete</button>
               </div>

          ))}
           {editAd && (
                  <div className="max-w-2xl mx-auto p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Advertisement</h1>
                  <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editForm.artist}
                    onChange={(e) => setEditForm({ ...editForm, artist: e.target.value })}
                    placeholder="Enter artist name"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editForm.imageURL}
                    onChange={(e) => setEditForm({ ...editForm, imageURL: e.target.value })}
                    placeholder="Enter image URL"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editForm.genre}
                    onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
                    placeholder="Enter event genre"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    placeholder="Enter age recommendation"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    placeholder="Enter event location"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    placeholder="Enter event date"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editForm.time}
                    onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                    placeholder="Enter event time"
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={async () => {
                        const apiClient = new ApiClient();
                        try {
                          await apiClient.updateAd(editAd._id, editForm.title, editForm.artist, editForm.genre, editForm.age, editForm.location, editForm.date, editForm.time, editForm.imageURL, editForm.description, parseFloat(editForm.price));
                          setEditAd(null); 
                          window.location.reload();
                        } catch (err) {
                          const message = err.response?.data?.message || "Update failed.";
                          alert(message);
                          console.error("Update failed", err.response?.data || err.message);
                        }
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditAd(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                  
                </div>
    
        </div>
       
  )}
      </div>
      )}
      </div>
      )}
      