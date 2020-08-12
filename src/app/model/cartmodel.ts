 import { ProductModelServer} from './productmodel';

 export interface CartModelServer {
    total: number;
    data: [{
        product: ProductModelServer,
        numInCart: number
    }];


}

 export interface CartModelPublic {
    total: number;
    proData: [{
        id: number,
        inCart: number
    }

    ]

}
