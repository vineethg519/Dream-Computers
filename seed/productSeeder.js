var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping');

var products = [
    new Product.lapi({
         imagePath: 'http://store.hp.com/wcsstore/hpusstore/Treatment/HP_Spectre_q2fy17_modal_pdt2.jpg',
        title: 'HP Spectre x360',
        description: 'Seductive power.Take it for a spin. Experience technology at its very best on the all-new Spectre x360. Refined craftsmanship meets unquestionable power for a machine that does more than meet expectations - it transcends them',
        price: 660
    }),
    new Product.lapi({
        imagePath: 'https://s-media-cache-ak0.pinimg.com/originals/79/4d/90/794d90c5c24a8bb9ad9c637288d134ce.jpg',
        title: 'Apple MacBook Pro',
        description: 'It’s a war of new and refreshed MacBooks from 2016 and previous year 2015, It was not only about the updated specs with software. Apple has brought something that the company’s Senior Vice President believes that “it’s going to be great” and would offer “so much potential” to the developers.',
        price: 2199
    }),
    new Product.lapi({
        imagePath: 'https://cdn3.vox-cdn.com/assets/1518263/ideapad-yoga-11-006.jpg',
        title: 'Lenovo Ideapad Y700',
        description: '15.6" IMMERSIVE GAMING LAPTOP Experience intense, immersive gaming – the IdeaPad Y700 gives you quad-core power, discrete graphics and a complete multimedia experience with hi-def display, surround sound and subwoofer. When the competition heats up, don’t worry, because the Y700 has thermal cooling for serious gaming',
        price: 1049
    }),
    new Product.lapi({
        imagePath: 'https://www.compuindia.com/media/catalog/product/cache/2/image/800x800/9df78eab33525d08d6e5fb8d27136e95/5/5/5521-red_14.jpg',
        title: 'Dell Inspiron 14R (N5421)',
        description: 'Smart performance in a slimmer new design. The new Dell Inspiron 14R with 6-cell battery features 3rd Gen Intel® Core™ processors in a sleek design that’s 8% thinner than the 2011 model. So you get all the performance you need, with a little more room in your bag for the other things that matter.',
        price: 855
    }),
    new Product.lapi({
        imagePath: 'http://store.hp.com/wcsstore/hpusstore/Treatment/HP_Spectre_q2fy17_HeroBanner_mb.jpg',
        title: 'HP Spectre x364',
        description: 'Seductive power.Take it for a spin. Experience technology at its very best on the all-new Spectre x360. Refined craftsmanship meets unquestionable power for a machine that does more than meet expectations - it transcends them',
        price: 664
    }),
    new Product.lapi({
        imagePath: 'http://store.hp.com/wcsstore/hpusstore/Treatment/HP_Spectre_q2fy17_HeroBanner_mb.jpg',
        title: 'HP Spectre x365',
        description: 'Seductive power.Take it for a spin. Experience technology at its very best on the all-new Spectre x360. Refined craftsmanship meets unquestionable power for a machine that does more than meet expectations - it transcends them',
        price: 665
    }),
    new Product.entryRigs({
        rigId:'Rig #1234',
        processor : 'Intel core i3',
        motherBoard:'Gigabyte',
        ram:'2 GB DDR3',
        hdd:'500 GB',
        graphicCardd:'integrated 2 GB',
        psu:'450 Watt',
        price:300
    }),
    new Product.entryRigs({
        rigId:'Rig #1235',
        processor : 'Intel 2 duo',
        motherBoard:'Gigabyte',
        ram:'1 GB DDR3',
        hdd:'500 GB',
        graphicCardd:'integrated 1 GB',
        psu:'450 Watt',
        price:320
    }),
    new Product.entryRigs({
        rigId:'Rig #1236',
        processor : 'Intel 2 quad',
        motherBoard:'Intel',
        ram:'2 GB DDR3',
        hdd:'250 GB',
        graphicCardd:'integrated 2 GB',
        psu:'425 Watt',
        price:350
    }),

    new Product.greatRigs({
        rigId:'Rig #1324',
        processor : 'Intel core i5',
        motherBoard:'Intel',
        ram:'4 GB DDR3',
        hdd:'500 GB',
        graphicCardd:'integrated 4 GB',
        psu:'550 Watt',
        price:450
    }),
    new Product.greatRigs({
        rigId:'Rig #1325',
        processor : 'Intel i7',
        motherBoard:'MSI',
        ram:'8 GB DDR3',
        hdd:'750 GB',
        graphicCardd:'dedicated 1 GB',
        psu:'650 Watt',
        price:500
    }),
    new Product.greatRigs({
        rigId:'Rig #1326',
        processor : 'Intel i7',
        motherBoard:'MSI',
        ram:'8 GB DDR3',
        hdd:'1 TB',
        graphicCardd:'dedicated 2 GB',
        psu:'750 Watt',
        price:550
    }),

    new Product.gameRigs({
        rigId:'Rig #1424',
        processor : 'AMD Athlon',
        motherBoard:'AMD',
        ram:'16 GB DDR3',
        hdd:'1 TB',
        graphicCardd:'dedicated 4 GB',
        psu:'650 Watt',
        price:750
    }),
    new Product.gameRigs({
        rigId:'Rig #1425',
        processor : 'Intel i5',
        motherBoard:'ASUS',
        ram:'8 GB DDR3',
        hdd:'750 GB',
        graphicCardd:'dedicated 4 GB',
        psu:'750 Watt',
        price:600
    }),
    new Product.gameRigs({
        rigId:'Rig #1426',
        processor : 'Intel i7',
        motherBoard:'MSI',
        ram:'16 GB DDR3',
        hdd:'2 TB',
        graphicCardd:'dedicated 2 GB',
        psu:'700 Watt',
        price:850
    }),

    new Product.procType({
        name:'Processor',
        brand:'Intel',
        model:'i5',
        price:50
    }),
    new Product.procType({
        name:'Processor',
        brand:'Intel',
        model:'Core 2 Duo',
        price:45
    }),
    new Product.procType({
        name:'Processor',
        brand:'Intel',
        model:'Core i7',
        price:60
    }),
    new Product.procType({
        name:'Processor',
        brand:'Intel',
        model:'i7',
        price:70
    }),
    new Product.procType({
        name:'Processor',
        brand:'AMD',
        model:'Athlon AX',
        price:50
    }),
    new Product.procType({
        name:'Processor',
        brand:'AMD',
        model:'Athlon TX',
        price:70
    }),

    new Product.motherB({
        name:'Motherboard',
        brand:'Intel',
        model:'Atom',
        price:100
    }),
    new Product.motherB({
        name:'Motherboard',
        brand:'Intel',
        model:'Atom Pro',
        price:120
    }),
    new Product.motherB({
        name:'Motherboard',
        brand:'GIGABYTE',
        model:'Ultra durable',
        price:50
    }),
    new Product.ram({
        name:'ram',
        brand:'Samsung',
        model:'PCX1 128 gb',
        price:40
    }),
    new Product.ram({
        name:'ram',
        brand:'Lenovo',
        model:'VX2 512 gb',
        price:120
    }),
    new Product.ram({
        name:'ram',
        brand:'Samsung',
        model:'PCX2 128 gb',
        price:70
    }),
    new Product.ram({
        name:'ram',
        brand:'Lenovo',
        model:'VCX2 256 gb',
        price:150
    }),
    new Product.ram({
        name:'ram',
        brand:'Samsung',
        model:'MXC 1tb',
        price:250
    }),

    new Product.graphics({
        name:'graphics',
        brand:'NVIDIA',
        model:'GTX 1080 Ti 2gb',
        price:300
    }),
    new Product.graphics({
        name:'graphics',
        brand:'AMD',
        model:'Redeon 2gb',
        price:200
    }),
    new Product.graphics({
        name:'graphics',
        brand:'NVIDIA',
        model:'GTX 1050 4gb',
        price:150
    }),
    new Product.graphics({
        name:'graphics',
        brand:'NVIDIA',
        model:'GT 640 4gb',
        price:80
    }),
    new Product.graphics({
        name:'graphics',
        brand:'NVIDIA',
        model:'GTX 960 2gb',
        price:110
    }),
    new Product.hdd({
        name:'hdd',
        brand:'samsung',
        model:'elite 250gb',
        price:50
    }),
    new Product.hdd({
        name:'hdd',
        brand:'seagate',
        model:'pro 2tb',
        price:190
    }),
    new Product.hdd({
        name:'hdd',
        brand:'samsung',
        model:'elite 1tb',
        price:150
    }),
    new Product.hdd({
        name:'hdd',
        brand:'seagate',
        model:'pro 500gb',
        price:100
    }),
    new Product.hdd({
        name:'hdd',
        brand:'seagate',
        model:'PX 500gb',
        price:70
    }),
    new Product.psu({
        name:'psu',
        brand:'EVGA',
        model:'500W',
        price:50
    }),
    new Product.psu({
        name:'psu',
        brand:'EVGA',
        model:'750W',
        price:120
    }),
    new Product.psu({
        name:'psu',
        brand:'EVGA',
        model:'550W',
        price:80
    }),
    new Product.psu({
        name:'psu',
        brand:'EVGA',
        model:'600W',
        price:110
    }),
    new Product.psu({
        name:'psu',
        brand:'EVGA',
        model:'500W',
        price:80
    })

];

var done = 0;
for(var  i = 0; i < products.length; i++){
    products[i].save(function (err, result) {
        done++;
        if(done == products.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
mongoose.disconnect();