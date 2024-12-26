import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from './Pagination'
import {
    firstPageNavID,
    prevPageNavID,
    nextPageNavID,
    lastPageNavID
} from '../constants'

const TOTAL_PAGES = 5

describe('Pagination', () => {
    const user = userEvent.setup()
    const onChangeMock = jest.fn()
    window.scrollTo = jest.fn();

    beforeEach(() => {
        onChangeMock.mockClear()
        render(
            <Pagination totalPages={TOTAL_PAGES} onChange={onChangeMock} />
        )
    })

    it('renders correctly with basic elements', () => {
        for (let i = 1; i <= TOTAL_PAGES; i++) {
            expect(screen.getByText(`${i}`)).toBeInTheDocument();
        }
    });

    it('navigates to the next/previous page when the Next/Previous button is clicked', async () => {
        const nextButton = screen.getByTestId(nextPageNavID);
        const prevButton = screen.getByTestId(prevPageNavID)

        await user.click(nextButton)
        expect(onChangeMock).toHaveBeenCalledWith(2);
        await user.click(prevButton)
        expect(onChangeMock).toHaveBeenCalledWith(1);
    });

    it('navigates to the first/last page with FirstPage/LastPage buttons', async () => {
        const firstButton = screen.getByTestId(firstPageNavID);
        const lastButton = screen.getByTestId(lastPageNavID);

        await user.click(lastButton)
        expect(onChangeMock).toHaveBeenCalledWith(5);

        await user.click(firstButton)
        expect(onChangeMock).toHaveBeenCalledWith(1);
    });

    it('disables Last/Next buttons on last page and disables Previous/First buttons on first page', async () => {
        const lastButton = screen.getByTestId(lastPageNavID);
        expect(screen.getByTestId(firstPageNavID)).toBeDisabled();
        expect(screen.getByTestId(prevPageNavID)).toBeDisabled();

        await user.click(lastButton);

        expect(screen.getByTestId(nextPageNavID)).toBeDisabled();
        expect(screen.getByTestId(lastPageNavID)).toBeDisabled();
    });

    it('handles clicking on the current active page without errors', async () => {
        const currentPageButton = screen.getByText('1');
        await user.click(currentPageButton);

        // The callback should not be called
        expect(onChangeMock).toHaveBeenCalledWith(1);
    });

});