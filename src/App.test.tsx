import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Artists } from "features/artists/artists";

test("renders search box for artists", () => {
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <Artists />
    </Provider>
  );

  expect(getByPlaceholderText(/search artist/i)).toBeInTheDocument();
});
