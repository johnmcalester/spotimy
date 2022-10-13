import React, { useEffect, useState } from 'react'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import BuildingLibraryIcon from '@heroicons/react/24/outline/BuildingLibraryIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import RssIcon from '@heroicons/react/24/outline/RssIcon';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-r-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5" /> 
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="w-5 h-5" />
          <p>Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900"></hr>

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="w-5 h-5" /> 
          <p>Add Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="w-5 h-5" />
          <p>Like</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="w-5 h-5" />
          <p>Episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900"></hr>

        {playlists.map((playlist) => 
          <p 
          key={playlist.id} 
          onClick={() => setPlaylistId(playlist.id)}
          className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        )};
      </div>
    </div>
  );
}

export default Sidebar;