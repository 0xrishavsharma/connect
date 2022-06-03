import { useState, useEffect } from "react";
import { recommendedProfiles, client } from "../api";

export default function Home() {
  useEffect( ()=> {
    fetchProfiles()
  }, [])

  function fetchProfiles(){
    const request = client.query(recommendedProfiles).toPromise;
  }
  return (
  
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span >
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          </span>
        </a>
      </footer>
  )
}
