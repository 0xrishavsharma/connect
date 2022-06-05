import { useRouter } from 'next/router';
import { client, getProfile, query, getPublications } from '../../api';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ethers } from "ethers";
import ABI from "./../../abi.json";

const address = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

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

    async function connect() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        console.log({ accounts })
    }

    async function followUser(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        const contract = new ethers.Contract(address, ABI, signer);
    
        try{
          const tx = await contract.follow([id], [0x0]);
          await tx.wait();
          console.log("Followed user successfully!")
        }catch(e){
          console.log(e);
        }
      }

    if(!profile) return null;

  return (
    <div>
        <button onClick={connect()}>Sign in</button>
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
            <button>Follow</button>
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