'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types';
import { Card } from '@/components/ui/card'; // Импортируйте компонент Card из Shadcn UI



const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {users.map(user => (
        <Card key={user.id} className="border rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Company: {user.company.name}</p>
          <Link href={`/user/${user.id} `}legacyBehavior>
            <a className="text-blue-500 hover:underline">View Details</a>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Home;