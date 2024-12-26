import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Header from "./Header";
import { siteNameTitle, cartTitle } from '../constants';

describe('Header', () => {
    const renderHeader = (cartItemCount) => {
        render(
            <MemoryRouter>
                <Header cartItemCount={cartItemCount} />
            </MemoryRouter>
        )
    }

    it('renders Header component with its elements', () => {
        renderHeader(0);

        expect(screen.getByRole('link', { name: siteNameTitle })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: cartTitle })).toBeInTheDocument()
    });

    it('shows cart item count when cartItemCount > 0', () => {
        renderHeader(5);

        expect(screen.getByText('5')).toBeInTheDocument()
    });

    it('does not show cart item count when cartItemCount = 0', () => {
        renderHeader(0);

        const countBadge = screen.queryByText('0')

        expect(countBadge).not.toBeInTheDocument()
    });
});
