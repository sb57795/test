import React from 'react';
import { useRouter } from 'next/router';
import { User } from '@/types';

const UserPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      if (!id) return; 
      console.log('Fetching user with ID:', id); // Логирование ID
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error('Ошибка при загрузке данных пользователя');
        const data = await response.json();
        setUser(data);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!user) return <div>Пользователь не найден</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h2 className="text-lg font-bold mt-4">Адрес</h2>
      <p>{user.address.street}, {user.address.city}</p>
      <p>Телефон: {user.phone}</p>
      <p>Вебсайт: {user.website}</p>
      <h2 className="text-lg font-bold mt-4">Компания</h2>
      <p>{user.company.name}</p>
    </div>
  );
};

export default UserPage;

