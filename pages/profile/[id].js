import React from 'react';
import { useRouter } from 'next/router';
import { getProfile } from '../../api';

const Profile = () => {

    const router = useRouter();
    const { id } = router.query;
  return (
    <div>
        {getProfile}
    </div>
  )
}

export default Profile