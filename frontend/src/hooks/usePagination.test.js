import { renderHook } from "@testing-library/react";
import { act } from "react";
import usePagination from "./usePagination";


describe('usePagination', () => {
    const items = Array.from({ length: 20 }, (_, i) => i + 1);
    const itemsPerPage = 5;
    let result;

    beforeEach(() => {
        const hook = renderHook(() => usePagination(items, itemsPerPage));
        result = hook.result;
    });



    it('returns the page number 1 initially', () => {
        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(4);
    });

    it('updates currentPage and currentItems on page change', () => {
        act(() => {
            result.current.handlePageChange(2);
        });
        expect(result.current.currentPage).toBe(2);
        expect(result.current.currentItems).toEqual([6, 7, 8, 9, 10]);
    });

    it('calls window.scrollTo on page change', () => {
        const scrollToMock = jest.fn();
        window.scrollTo = scrollToMock;

        act(() => {
            result.current.handlePageChange(2);
        });

        expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('does not allow currentPage to exceed totalPages', () => {

        act(() => {
            result.current.handlePageChange(5);
        });

        expect(result.current.currentPage).toBe(1);
    });
    it('does not allow currentPage to go below 1', () => {

        act(() => {
            result.current.handlePageChange(0); 
        });

        expect(result.current.currentPage).toBe(1); 
    });




});
