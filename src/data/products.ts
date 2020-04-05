
export interface Product{
    id: string
    label: string
    unit: 'szt',
    price: number
}

const products: Product[] = [
    {
        id: 'pasta',
        label: 'makaron',
        unit: 'szt',
        price: 4.95
    },
    {
        id: 'butter',
        label: 'masło',
        unit: 'szt',
        price: 3.15
    },
    {
        id: 'milk2',
        label: 'mleko 2%',
        unit: 'szt',
        price: 2.20
    },
    {
        id: 'milk3',
        label: 'mleko 3%',
        unit: 'szt',
        price: 2.30
    },
    {
        id: 'cheese',
        label: 'ser żółty',
        unit: 'szt',
        price: 4.80
    },
    {
        id: 'mayonnaise',
        label: 'majonez Hellmanz 420ml',
        unit: 'szt',
        price: 4.70
    },
    {
        id: 'ketchup',
        label: 'ketchup Pudliszki łagodny 450ml',
        unit: 'szt',
        price: 5.10
    },
    {
        id: 'eggs10',
        label: 'jajka 10szt.',
        unit: 'szt',
        price: 8.99
    },
    {
        id: 'wheat_bread',
        label: 'chleb pszenny',
        unit: 'szt',
        price: 2.60
    },
    {
        id: 'rice',
        label: 'ryż',
        unit: 'szt',
        price: 4.30
    }
];

export default products
