

import { GetServerSideProps } from 'next';
import { User } from '@/types';
import {Card} from '@/components/ui/card';


interface UserDetailProps {
  user: User | null;
}

const UserDetail = ({ user }: UserDetailProps)  => {
  if (!user) return <div>User not found</div>;

  return (
    <Card className="p-4">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address.street}, {user.address.city}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: <a href={`http://${user.website}`} className="text-blue-500">{user.website}</a></p>
      <p>Company: {user.company.name}</p>
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  let user = null;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (response.ok) {
      user = await response.json();
    }
  } catch (error) {
    console.error(error);
  }

  return { props: { user } };
};

export default UserDetail;
