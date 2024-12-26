import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import QuantitySelector from './QuantitySelector';

describe('QuantitySelector', () => {
    const user = userEvent.setup();
    const mockOnIncrease = jest.fn();
    const mockOnDecrease = jest.fn();

    const renderQuantitySelector = (props) => {
        render(
            <QuantitySelector
                quantity={props.quantity}
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
                max={props.max}
            />
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });


    it('displays the current quantity correctly', () => {
        renderQuantitySelector({ quantity: 5, max: 10 });
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('calls onIncrease when + button is clicked', async () => {
        renderQuantitySelector({ quantity: 5, max: 10 });

        const increaseButton = screen.getByRole('button', { name: '+' });
        await user.click(increaseButton);

        expect(mockOnIncrease).toHaveBeenCalledTimes(1);
    });

    it('calls onDecrease when - button is clicked', async () => {
        renderQuantitySelector({ quantity: 5, max: 10 });

        const decreaseButton = screen.getByRole('button', { name: '-' });
        await user.click(decreaseButton);

        expect(mockOnDecrease).toHaveBeenCalledTimes(1);
    });

    it('disables + button when quantity is at max', () => {
        renderQuantitySelector({ quantity: 10, max: 10 });

        const increaseButton = screen.getByRole('button', { name: '+' });
        expect(increaseButton).toBeDisabled();
    });


});
