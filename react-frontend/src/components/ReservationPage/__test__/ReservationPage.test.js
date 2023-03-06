import React from "react";
import { render, screen } from "@testing-library/react";

import ReservationPage from "../ReservationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders reservation page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReservationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("reservation-datatable")).toBeInTheDocument();
    expect(screen.getByRole("reservation-add-button")).toBeInTheDocument();
});
