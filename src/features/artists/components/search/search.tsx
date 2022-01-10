import { useAppDispatch, useAppSelector } from "app/hooks";
import Clearbtn from "components/clear-btn/clearbtn";
import {
  fetchArtistsAsync,
  resetSearch,
  selectArtist,
  selectStatus,
} from "features/artists/artistsSlice";
import { useDebounce } from "hooks";
import { IArtist } from "interface/artist";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export default function SearchArtists() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const [query, setQuery] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedValue = useDebounce<string>(query, 500);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleArtistSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    artist: IArtist
  ) => {
    dispatch(selectArtist(artist));
  };

  const handleSearchReset = () => {
    dispatch(resetSearch());
    setQuery("");
    inputRef.current?.focus();
  };

  // Fetch API (optional)
  useEffect(() => {
    const fetchArtists = async () => {
      if (debouncedValue !== "") {
        const response = await dispatch(
          fetchArtistsAsync(debouncedValue)
        ).unwrap();
        setArtists(response);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    };
    fetchArtists();
  }, [debouncedValue, dispatch]);

  return (
    <div className="relative text-left">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Artist"
          ref={inputRef}
          value={query}
          className="placeholder:text-stone-400 text-stone-400 rounded-sm text-3xl w-full p-3 pr-16 bg-neutral-800 outline-none focus:outline-none"
          onChange={handleChange}
          onFocus={() => setShowSuggestions(query ? true : false)}
          onBlur={() => setShowSuggestions(false)}
        />
        {query && (
          <div className="absolute right-2 top-2">
            <Clearbtn onclick={handleSearchReset} />
          </div>
        )}
      </div>
      {showSuggestions && debouncedValue && (
        <div className="rounded absolute w-full p-3 text-white mt-3 bg-neutral-800 max-h-80 overflow-y-auto	">
          {status === "searching" ? (
            <p>Searching results</p>
          ) : (
            <>
              {artists.length ? (
                <>
                  <p>Search Results</p>
                  <ul>
                    {artists.map((artist) => {
                      return (
                        <li key={artist.id}>
                          <button
                            className="w-full border-b border-stone-900	 background-transparent font-bold uppercase p-4 text-left text-xs outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
                            type="button"
                            onMouseDown={(e) => {
                              handleArtistSelect(e, artist);
                            }}
                          >
                            {artist.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <p>No Artists Found</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
