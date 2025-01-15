import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Checkout from './CheckoutPage'
import * as constants from './constants'
import { headerID } from '../../components/constants'

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('CheckoutPage', () => {
    const mockOnCheckoutComplete = jest.fn();


    const sampleCartItems = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    ]


    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <MemoryRouter>
                <Checkout cartItems={sampleCartItems} onCheckoutComplete={mockOnCheckoutComplete} />
            </MemoryRouter>
        )
    });

    it('renders the header component', () => {
        expect(screen.getByTestId(headerID)).toBeInTheDocument();
    });

    it('renders form title', () => {
        expect(screen.getByText(constants.checkoutTitle)).toBeInTheDocument();
    });

    it('renders form fields correctly', () => {
        expect(screen.getByText(constants.requiredFieldsText)).toBeInTheDocument();
        expect(screen.getByLabelText(constants.nameFieldLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(constants.surnameFieldLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(constants.addressFieldLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(constants.countryFieldLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(constants.acknowledgementText)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: constants.proceedLabel })).toBeDisabled();
        expect(screen.getByRole('link', { name: constants.backToCartLabel })).toBeInTheDocument();
    });

    it("calculates and displays the total price correctly", () => {
        const totalElement = screen.getByText(/Total: \$/);
        expect(totalElement).toHaveTextContent("Total: $40.00");
    });

    it("enables proceed button and proceed to finish page if all the required fields are filled", async () => {
        const user = userEvent.setup()

        const proceedButton = screen.getByRole('button', { name: constants.proceedLabel })
        const nameInput = screen.getByLabelText(constants.nameFieldLabel);
        const surnameInput = screen.getByLabelText(constants.surnameFieldLabel);
        const addressInput = screen.getByLabelText(constants.addressFieldLabel);
        const countryInput = screen.getByLabelText(constants.countryFieldLabel);
        const acknowledgeInput = screen.getByLabelText(constants.acknowledgementText);

        expect(proceedButton).toBeDisabled();

        await user.type(nameInput, "John");
        await user.type(surnameInput, "Doe");
        await user.type(addressInput, "John Avenue 3");
        await user.selectOptions(countryInput, "USA");
        await user.click(acknowledgeInput);

        expect(proceedButton).toBeEnabled();

        await user.click(proceedButton);

        expect(mockNavigate).toHaveBeenCalledWith("/finish");
        expect(mockOnCheckoutComplete).toHaveBeenCalled();
    });
});