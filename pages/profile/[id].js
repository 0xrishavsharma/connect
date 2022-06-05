import { useRouter } from 'next/router';
import { client, getProfile, query, getPublications } from '../../api';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Profile = () => {

    const router = useRouter();
    const { id } = router.query;

    const [profile, setProfile] = useState();
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        if(id){
            fetchProfile();
            fetchPublications();
        }
        
    }, [id])

    async function fetchProfile(){
        try{
            const response = await client.query(getProfile, {id}).toPromise();
            console.log(response);
            setProfile(response.data.profiles.items[0])
        }catch(e){
            console.log(e);
        }
    }

    async function fetchPublications(){
        try{
            const publicationResponse = await client.query(getPublications, {id}).toPromise();
            console.log(publicationResponse);
            setPublications(publicationResponse.data.publications.items)
            console.log(publications);
        }catch(e){
            console.log(e);
        }
    }

    if(!profile) return null;

  return (
    <div>
        { profile.picture ? (
            <Image 
                src={profile.picture.original.url} 
                width="200px" 
                height="200px" 
                alt="image"
                />
            ): (
                <div style={{backgroundColor:"white", width:"200px", height:"200px"}}>

                </div>
            )
        }
        <div>
            <h2>{profile.handle}</h2>
            <p>{profile.bio}</p>
            <h4>Followers: {profile.stats.totalFollowers}</h4>
            <h4>Following: {profile.stats.totalFollowing}</h4>
            
        </div>

        {
            publications.map((publication, index) => {
                <p>{publication.metadata.content}</p>
            })
        }
    </div>
  )
}

export default Profile