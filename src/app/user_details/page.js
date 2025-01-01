'use client';

import { useState } from 'react';

export default function UserDetails({ user }) {
  const [formData, setFormData] = useState({ cms_id: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/update-crew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cms_id: formData.cms_id, user_id: user.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update crew');
      }
      const data = await response.json();
      console.log('Update successful:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter CMS ID:</label>
      <input
        type="text"
        name="cms_id"
        value={formData.cms_id}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
