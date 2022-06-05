import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import { recommendedProfiles, client } from "../api";
import Image from 'next/image';

export default function Home() {

  const [profiles, setProfiles] = useState([]);

  useEffect( ()=> {
    fetchProfiles()
  }, )

  async function fetchProfiles(){
    try{
      const response = await client.query(recommendedProfiles).toPromise();
      // console.log({ response });
      setProfiles(response.data.recommendedProfiles);
    }catch(error){
      console.log({ error });
    }
  }

  if(!profiles) return null;
  // if(!profiles.picture) return null;
  // if(!profiles.picture.original) return null;
  

  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        { 
          profiles.map((profile, index) => (
            <div className={styles.profileDetails} key={profile.id}>
              <Link  href={`/profile/${profile.id}`}>
                    <div className={styles.pdContainer}>
                      {
                        profile.picture ? (
                          <Image src={profile.picture.original.url} className={styles.profileImage} width="50px" height="50px" alt="image"/>
                        ): (
                          <div style={{backgroundColor:"white", width:"50px", height:"50px", borderRadius:"0.4rem"}}></div>
                        )
                      }
                      <h4>{profile.handle}</h4>
                      <p>{profile.bio}</p>
                    </div>
              </Link>
            </div>
        ))
        }
      </div>
    </div>
  )
}
