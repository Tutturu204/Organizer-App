type Item = { 
    id: string
}

//TItem extends Item guaranteed that new type will have id field, but other params will be optional
export const findItemIndexById = <TItem extends Item>(
    items: TItem[],
    id: string
) => {
    return items.findIndex((item:TItem) => item.id === id )
}