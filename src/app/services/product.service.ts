import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [
      {
        id: 1 ,
        images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd;https://static.toiimg.com/thumb/msid-56933980,width-640,resizemode-4,imgsize-85436/56933980.jpg;https://cdn.mos.cms.futurecdn.net/3328be45e8c7fe5194055b4c687fb769-1200-80.jpeg;https://img.etimg.com/thumb/width-640,height-480,imgsize-76492,resizemode-1,msid-52464286/46.jpg',
        quantity: 1,
        category: 'electronics',
        title: 'PlyStation 4',
        description: 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device' ,
        price: 240.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd'
      },
      {
        id: 2 ,
        quantity: 5,
        category: 'fashion',
        title: 'PEGASUS 33 Running Shoes For Men',
        description: 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training' ,
        price: 59.99,
        image: 'https://i.ebayimg.com/images/g/eQgAAOSw2XdePfc0/s-l640.jpg'
      },
      {
        id: 3 ,
        quantity: 3,
        category: 'fashion',
        title: 'MEN\'S ADIDAS RUNNING KALUS SHOES',
        images: null,
        description: 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear' ,
        price: 39.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf'
      },
      {
        id: 4 ,
        quantity: 4,
        title: 'Xbox One X Star Wars Jedi',
        category: 'electronics',
        images: null,
        description: 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***' ,
        price: 250,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP'
      },
      {
        id: 5 ,
        quantity: 5,
        title: 'Powerful Super X-Bass AG-5050-Amstrong Home Theatre With Perfect Bluetooth',
        description: 'Select from a wide range of Unique products on Jumia and enjoy convenient and secure online shopping, nationwide delivery, guaranteed products and competitive pricing. The features: Channels: 6 Power Output: 5000 Watts Speaker Type: Tower Other Features: Supports MP3, WMA format music, with FM radio. Clear sound, high-quality acoustic effect Distortion: 0.7% 9W.Compatible with DVD, TV, USB, FM radio, SD card' ,
        price: 200,
        category: 'electronics',
        image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/61/907613/1.jpg?4948'
      },
      {
        id: 6 ,
        quantity: 0,
        title: 'PlayStation 4',
        category: 'electronics',
        images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd;https://static.toiimg.com/thumb/msid-56933980,width-640,resizemode-4,imgsize-85436/56933980.jpg;https://cdn.mos.cms.futurecdn.net/3328be45e8c7fe5194055b4c687fb769-1200-80.jpeg;https://img.etimg.com/thumb/width-640,height-480,imgsize-76492,resizemode-1,msid-52464286/46.jpg',
        description: 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device' ,
        price: 240.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd'
      },
      {
        id: 7 ,
        quantity: 6,
        category: 'electronics',
        title: 'LLOYD 32-inch New 2020 Full HD TV + Free Wall Bracket',
        description: 'Don\'t be deceived by its medium size, The Lloyd 32 Inch LED HD TV has an amazing full High-definition resolution, perfectly designed to fit into any space in your home. its full HD 1366 * 768p resolution provides you with a much higher picture quality than other regular TV. Enjoy luminous clarity that eliminates blur and artifacts which ensures fast-motion picture quality when viewing your favorite programs',
        price: 350.99,
        image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/76/184945/1.jpg?5487'
      },
      {
        id: 8 ,
        quantity: 8,
        category: 'electronics',
        title: 'Rechargable A11 Home Theater Subwoofer Bluetooth FM Speaker',
        description: 'The Bluetooth Wireless Portable Stereo Speaker with Hi-Fi output can be used indoor and outdoor. This speaker features loud volume & good bass sound quality; room filling sound. Its perfect for home, dorm room, kitchen, bathroom. Connect your IPhone, Samsung, Android, or Bluetooth device to experience good quality stereo sound. Enjoy conference calling system feature in the office or with a group of friends. Enjoy FM radio function while in and out of the house',
        price: 100.99,
        image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/33/786454/1.jpg?7743'
      },
      {
        id: 9 ,
        quantity: 9,
        category: 'electronics',
        title: 'Sedge Black Bluetooth Earphone (with Over 8 Hours Of Battery-life)',
        description: 'Sedge E1 Bluetooth wireless earphone is another quality product from Seven Points Clothing Ltd, with over eight hours of battery-life. It comes with a USB charger. Sedge E1 has an excellent sound system that is suitable for all kinds of music. It enables you to easily change tracks with the earphone, while listening to music. It also enables you to increase or decrease volume using the earphone. Sedge E1 also supports making and receiving phone calls, with an excellent audio that allows you to hear the other person clearly.',
        price: 100.99,
        image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/45/505454/1.jpg?9182'
      },
      {
        id: 10,
        quantity: 10,
        category: 'fashion',
        title: 'Men\'s Fashion White Shoes Casual Sneakers -White',
        description: 'Elegant shoes attract the attention of onlookers with their sleek and gorgeous appearance. The soft, comfortable, breathable knit upper provides a breathable space for the legs, soft and protective, so you can easily perform every step of the way. Durability. Stable on the ground. Its range of details will make you stand out. No matter how long you wear it, it will continue to maintain its sturdy shape. Are you always looking for a store with the best creativity, inspiration and soul? Pay attention to us, we can always bring you surprises. If the project is good, give a five-star rating. Your praise is the driving force of our continuous efforts.',
        price: 50,
        image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/13/994924/1.jpg?4937" src="https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/13/994924/1.jpg?4937'

      }

  ];


  constructor(private http: HttpClient,
              private router: Router) { }

  /*fetch data from the backend*/
  getAllProducts() {
    return this.products;

  }

  getSingleProduct(id: number) {
    return this.products[id - 1];

  }

  categoryFilter(category: string) {
    const newCatergory =  this.products.filter((cat) => {
      return cat.category === category; } );
    return newCatergory;
  }

}

