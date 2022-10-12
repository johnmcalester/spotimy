import React from 'react';
import { getProviders, signIn } from "next-auth/react";
import Image from 'next/image';

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <Image 
      className="p-5 mb-5;" 
      src="https://links.papareact.com/9xl" 
      alt="Spotify Logo" 
      width={200}
      height={200}
      />
    
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="bg-[#18D860] text-white p-5 rounded-lg" 
          onClick={() => signIn(provider.id, { callbackUrl: "/" }
          )}>
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };

}