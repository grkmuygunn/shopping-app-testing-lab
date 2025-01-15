import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { headerID } from '../../components/constants'
import FinishPage from './FinishPage';
import * as constants from '../constants'

describe('FinishPage', () => {
    const mockClearCart = jest.fn();

    beforeEach(() => {
        render(
            <MemoryRouter>
                <FinishPage clearCart={mockClearCart} />
            </MemoryRouter>
        )
    });
    
    it('renders header', () => {
        const header = screen.getByTestId(headerID);
        expect(header).toBeInTheDocument()
    });

    it('renders page elements', () => {
        const backToHomepageLink = screen.getByRole('link', { name: constants.backToHomepageLabel });

        expect(screen.getByText(constants.postPurchaseText)).toBeInTheDocument()
        expect(screen.getByText(constants.shippingInfoText)).toBeInTheDocument()
        expect(backToHomepageLink).toBeInTheDocument()
    });

    it('calls clearCart when return to homepage button is clicked', async () => {
        const user = userEvent.setup();
        const backToHomepageLink = screen.getByRole('link', { name: constants.backToHomepageLabel });

        await user.click(backToHomepageLink);

        expect(mockClearCart).toHaveBeenCalled()
    });


});