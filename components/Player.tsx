import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { useRecoilState } from 'recoil';
import { debounce } from 'lodash';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import 
    { 
        ArrowsRightLeftIcon,
        HeartIcon,
        SpeakerWaveIcon as SpeakerWaveDownIcon,
    }
 from '@heroicons/react/24/outline';
 import 
    { 
        BackwardIcon,
        ForwardIcon,
        PauseIcon,
        PlayIcon,
        SpeakerWaveIcon,
        ArrowUturnLeftIcon,
    }
 from '@heroicons/react/24/solid';

function Player() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if(!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };

    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyApi, session])

    useEffect(() => {
        if(volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {});
        }, 300),
        []
    )

    return (
        <div className="flex h-24 bg-gradient-to-b from-black to-gray-900 text-xs md:text-base px-2 md:px-8">
            <div className="flex flex-cols-4 items-center space-x-10">
                <Image 
                className="hidden md:inline h-10 w-10"
                src={songInfo?.album.images?.[0]?.url}
                alt=""
                width={50}
                height={50}
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
                <div className="flex items-center justify-evenly">
                    <ArrowsRightLeftIcon className="button" />

                    <BackwardIcon 
                    // onclick={() => spotifyApi.skipToPrevious()} - Spotify API is broken
                    className="button" />

                    {isPlaying ? (
                        <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                    ): (
                        <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                    )}

                    <ForwardIcon
                    // onclick={() => spotifyApi.skipToNext()} - Spotify API is broken
                    className="button"
                    />
                    <ArrowUturnLeftIcon className="button" />
                </div>
                <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                    <SpeakerWaveDownIcon 
                    onClick={() => volume > 0 && setVolume(volume - 20)} 
                    className="button" 
                    />
                    <input 
                    className="w-14 md:w-28" 
                    type="range" 
                    value={volume} 
                    min={0} 
                    max={100} 
                    onChange={(e) => setVolume(Number(e.target.value))}
                    />
                    <SpeakerWaveIcon 
                    className="button" 
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Player
