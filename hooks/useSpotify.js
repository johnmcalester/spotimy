import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react';
import { sign } from 'crypto';
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if(session) {
            if(session.error === 'RefreshAccessTokenError') {
                sign();
            };

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyApi;
}

export default useSpotify
