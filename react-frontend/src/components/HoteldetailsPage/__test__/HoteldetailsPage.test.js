import React from "react";
import { render, screen } from "@testing-library/react";

import HoteldetailsPage from "../HoteldetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hoteldetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HoteldetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hoteldetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("hoteldetails-add-button")).toBeInTheDocument();
});
