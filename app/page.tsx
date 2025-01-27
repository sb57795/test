'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types';
import { Card } from '@/components/ui/card'; // Импортируйте компонент Card из Shadcn UI

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Ошибка при загрузке пользователей');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Список пользователей</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <Card key={user.id} className="p-4">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Компания: {user.company.name}</p>
            <Link href={`/user/${user.id}`} className="text-blue-500 hover:underline">
              Посмотреть детали
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
