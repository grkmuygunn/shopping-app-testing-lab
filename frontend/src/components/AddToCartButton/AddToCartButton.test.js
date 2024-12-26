import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AddToCartButton from './AddToCartButton'
import { addToCartTitle, outOfStockTitle } from '../constants'

describe('AddToCartButton', () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    describe('when button is enabled', () => {
        beforeEach(() => {
            handleClick.mockClear()

            render(
                <AddToCartButton onClick={handleClick} disabled={false}>
                    {addToCartTitle}
                </AddToCartButton>
            )
        })

        it('renders enabled button with correct text', () => {
            const button = screen.getByRole('button', { name: addToCartTitle })

            expect(button).toBeEnabled()
        });

        it('calls onClick when clicked', async () => {
            const button = screen.getByRole('button', { name: addToCartTitle })
            await user.click(button)

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    });

    describe('when the button is disabled', () => {
        beforeEach(() => {
            handleClick.mockClear()

            render(
                <AddToCartButton onClick={handleClick} disabled={true}>
                    {outOfStockTitle}
                </AddToCartButton>
            )
        })

        it('should renders disabled button with correct text', () => {
            const button = screen.getByRole('button', { name: outOfStockTitle })

            expect(button).toBeDisabled()
        })

        it('should not call onClick when clicked', async () => {
            const button = screen.getByRole('button', { name: outOfStockTitle })
            await user.click(button)

            expect(handleClick).not.toHaveBeenCalled()

        })
    })

});
