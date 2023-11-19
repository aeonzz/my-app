import { ProfileForm } from '@/components/Forms/ProfileForm';
import ProfileHeader from '@/components/User-Components/ProfileHeader';
import { Card } from '@/components/ui/card';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { Suspense } from 'react';
import ProfileLoading from './loading';

const User = async () => {

  const session = await getServerSession(authOptions);


  let initialLetter = '';
  if (session && session.user.username) {
    initialLetter = session.user.username.charAt(0).toUpperCase();
  }

  return (
    <Suspense fallback={<ProfileLoading />}>
      <h1>{session?.user.role}</h1>
      <ProfileHeader
        letter={initialLetter}
        username={session?.user.username}
        email={session?.user.email}
      />
      <Card className='mt-24 p-8'>
        <ProfileForm />
      </Card>
    </Suspense>
  )
}

export default User;