import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  fetchAlbumTracksAsync,
  selectSelectedAlbum,
  selectSelectedArtist,
} from "features/artists/artistsSlice";
import { ITrack } from "interface/track";
import React, { useEffect, useState } from "react";
import { millisToMinutesAndSeconds } from "services/utility";
import styles from "./albuminfo.module.css";
import TracksTable from "./tracksTable";

export default function Albuminfo() {
  const selectedAlbum = useAppSelector(selectSelectedAlbum);
  const selectedArtist = useAppSelector(selectSelectedArtist);
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTracks = async () => {
      if (selectedAlbum) {
        const tracks = await dispatch(
          fetchAlbumTracksAsync(selectedAlbum.id)
        ).unwrap();
        setTracks(tracks);
      } else {
        setTracks([]);
      }
    };
    fetchTracks();
  }, [selectedAlbum, dispatch]);

  return (
    <>
      {/* using positions */}
      {selectedAlbum && (
        <div className={`relative ${styles.tracksContainer}`}>
          <div className={`absolute sm:ml-4 ${styles.albumImage}`}>
            <img
              src={selectedAlbum?.images[0].url}
              alt={selectedAlbum.name}
              className={`${styles.albumImg} aspect-square`}
            />
          </div>
          <div className={`overflow-x-auto text-left ${styles.albumTracks}`}>
            <p
              className={`text-cyan-400 text-xl sm:text-3xl truncate bg-stone-900 pb-6 ${styles.sidepadding}`}
            >
              {selectedAlbum?.name}
            </p>
            <TracksTable tracks={tracks} />
          </div>
        </div>
      )}
      {/* Using rowspan and colspan */}
      {selectedAlbum && (
        <div className={`relative ${styles.tracksContainer}`}>
          <div className={`overflow-x-auto text-left ${styles.albumTracks}`}>
            <table className="table-auto text-white w-full mb-8">
              <tbody className={`bg-stone-900 `}>
                <tr className={`bg-stone-900 `}>
                  <td rowSpan={3} className={`bg-stone-900 p-3`}>
                    <img
                      src={selectedAlbum?.images[0].url}
                      alt={selectedAlbum.name}
                      className={`${styles.albumImg} aspect-square`}
                    />
                  </td>
                  <td colSpan={4} className="p-3">
                    {selectedAlbum.name}
                  </td>
                </tr>
                <tr className={`bg-stone-900 `}>
                  <td className={`bg-stone-900 p-3`}>#</td>
                  <td className="p-3">Title</td>
                  <td className="p-3">Artist</td>
                  <td className="p-3">Time</td>
                  <td></td>
                </tr>
                {tracks.map((track, index) => (
                  <tr key={track.id} className={`bg-neutral-800 `}>
                    {/* <td></td> */}
                    {index === 0 ? null : <td></td>}
                    <td className={` p-3`}>{index}</td>
                    <td className="border-b border-stone-900 p-3">
                      {track.name}
                    </td>
                    <td className="border-b border-stone-900 p-3">
                      {selectedArtist?.name}
                    </td>
                    <td className="border-b border-stone-900 p-3">
                      {millisToMinutesAndSeconds(track?.duration_ms)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
