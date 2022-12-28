import { render, screen } from "@testing-library/react"
import Test from "./Test"

describe('tests',()=>{
    test('render test1',()=>{
        render(<Test/>)
        const test1 = screen.getByText('test1')
        expect(test1).toBeInTheDocument
    })
    test('render test2',()=>{
        render(<Test/>)
        const test2 = screen.getByText('test2')
        expect(test2).toBeInTheDocument
    })
    test('render test3',()=>{
        render(<Test/>)
        const test3 = screen.getByText('test3')
        expect(test3).toBeInTheDocument
    })
    test('render test4',()=>{
        render(<Test/>)
        const test4 = screen.getByText('test4')
        expect(test4).toBeInTheDocument
    })
    test('render test5',()=>{
        render(<Test/>)
        const test5 = screen.getByText('test5')
        expect(test5).toBeInTheDocument
    })
    test('render test6',()=>{
        render(<Test/>)
        const test6 = screen.getByText('test6')
        expect(test6).toBeInTheDocument
    })
    test('render test7',()=>{
        render(<Test/>)
        const test7 = screen.getByText('test7')
        expect(test7).toBeInTheDocument
    })
    test('render test8',()=>{
        render(<Test/>)
        const test8 = screen.getByText('test8')
        expect(test8).toBeInTheDocument
    })
    test('render test9',()=>{
        render(<Test/>)
        const test9 = screen.getByText('test9')
        expect(test9).toBeInTheDocument
    })
    test('render test10',()=>{
        render(<Test/>)
        const test10 = screen.getByText('test10')
        expect(test10).toBeInTheDocument
    })
})
