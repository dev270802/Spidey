const {sortPages}=require('./report')

test('sortPages',()=>{
    const input={
        "https://wagslane.dev":3,
        "https://wagslane.dev/path":10
    }
    const actual=sortPages(input)
    const excepted=[['wagslane.dev/path',10],['wagslane.dev',3]]

    expect(actual).toEqual(excepted)
})