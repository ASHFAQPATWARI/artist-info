import { useAppSelector } from "app/hooks";
import { selectSelectedArtist } from "features/artists/artistsSlice";
import { ITrack } from "interface/track";
import React from "react";
import { millisToMinutesAndSeconds } from "services/utility";
import styles from "./albuminfo.module.css";

export interface ITracksTable {
  tracks: ITrack[];
}
export default function TracksTable({ tracks }: ITracksTable) {
  const selectedArtist = useAppSelector(selectSelectedArtist);
  return (
    <table className="table-auto text-white w-full mb-8">
      <thead className={`bg-stone-900 ${styles.sidepadding} py-3`}>
        <tr className={`bg-stone-900 ${styles.sidepadding}`}>
          <th className={`bg-stone-900 ${styles.sidepadding} p-3`}>#</th>
          <th colSpan={3} className="p-3">
            Title
          </th>
          <th className="p-3">Artist</th>
          <th className="p-3">Time</th>
        </tr>
      </thead>
      <tbody className={`bg-stone-900 ${styles.sidepadding}`}>
        {tracks.map((track, index) => (
          <tr key={track.id} className={`bg-neutral-800 ${styles.sidepadding}`}>
            <td className={`${styles.sidepadding} p-3`}>{index}</td>
            <td colSpan={3} className="border-b border-stone-900 p-3">
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
  );
}
