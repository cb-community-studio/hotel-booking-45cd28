import React from "react";
import { render, screen } from "@testing-library/react";

import HoteldetailsEditDialogComponent from "../HoteldetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hoteldetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HoteldetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hoteldetails-edit-dialog-component")).toBeInTheDocument();
});
