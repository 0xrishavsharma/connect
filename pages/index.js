import Link from "next/link";
import { useState, useEffect } from "react";
import { recommendedProfiles, client } from "../api";
import "../styles/Home.module.scss";

export default function Home() {

  const [profiles, setProfiles] = useState([]);

  useEffect( ()=> {
    fetchProfiles()
  }, [])

  async function fetchProfiles(){
    try{
      const response = await client.query(recommendedProfiles).toPromise();
      // console.log({ response });
      setProfiles(response.data.recommendedProfiles)
    }catch(error){
      console.log({ error });
    }
  }

  return (
    <div className="home">
      { 
        profiles.map((profile, index) => (
          <Link key={profile.id} href={`/profile/${profiles.id}`}>
            <div className="profileDetails">
              <h4>{profile.handle}</h4>
              <p>{profile.bio}</p>
            </div>
          </Link>
      ))
      }
    </div>
  )
}
