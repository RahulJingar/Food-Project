import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, filterUsers } from './usersSlice';

const UsersList = () => {
  const dispatch = useDispatch();
  const { filteredUsers, loading, error } = useSelector((state) => state.users);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    dispatch(filterUsers(value));
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error loading users: {error}</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Filter users by name"
        value={filter}
        onChange={onFilterChange}
        style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
      />
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <p>No users match the filter.</p>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
