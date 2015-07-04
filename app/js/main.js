/**
 * Created by aliaksei on 02/08/14.
 */

var _;
var $;

define([
    'hutby/ui/offcanvas/Offcanvas',
    'hutby/common/Navigation',
    'hutby/common/Flat',
    'hutby/common/Catalog',
    'hutby/ui/PhotoSwipe',
	'underscore',
    'jquery',
	'jquery.me',
    'foundation',
    'foundation.offcanvas',
    'foundation.accordion',
    'modernizr'
], function(
    Offcanvas,
    Navigation,
    Flat,
    Catalog,
    PhotoSwipe,
	underscore,
	jquery) {
		
    _ = underscore;
	$ = jquery;
		
    var catalog = new Catalog();

    var flat = new Flat({
        rooms: 1,
        address: 'пр.Независимости 75',
        price: {
            amount: 50,
            currency: '$',
            special: "от 4 суток 45$"
        },
        overview: {
            description: "Расположена у пр.Независимости в шаговой доступности от метро Академия наук," +
                "с 2-ух спальной кроватью, ЖК ТВ, безлимитным интернетом. В наличии стиральная машина," +
                "холодильник, современная посуда. Предоставляем отчетные финансовые документы.",
            features: [
                "Безлимитный интернет (Wi-Fi)",
                "Отчетные документы"
            ]
        },
        photos: [
            {
                thumbnail: {
                    path: "img/red_kitchen_small_512x341.jpg",
                    width: 512,
                    height: 341,
                    media: "small_up"
                },
                images: [
                    {
                        path: "img/red_kitchen_medium_1440x960.jpg",
                        width: 1440,
                        height: 960,
                        media: "medium_down"
                    },
                    {
                        path: "img/red_kitchen_large_2880x1920.jpg",
                        width: 2880,
                        height: 1920,
                        media: "large_up"
                    }
                ]
            }
        ]
    });
    catalog.addFlat(flat);

    //flat = new Flat();
    //flat.setRooms(1);
    //flat.addPhoto("img/zgrada_zaton47.jpg");
    //flat.address('пр. Независимости 75');
    //flat.price(50);
    //flat.currency('$');
    //catalog.addFlat(flat);
    //
    //flat = new Flat();
    //flat.setRooms(1);
    //flat.addPhoto("img/deluxe_room.jpeg");
    //flat.addPhoto("img/image4.jpg");
    //flat.addPhoto("img/zgrada_zaton47.jpg");
    //flat.addPhoto("img/img3.jpg");
    //flat.addPhoto("img/deluxe_room.jpeg");
    //flat.addPhoto("img/image4.jpg");
    //flat.addPhoto("img/zgrada_zaton47.jpg");
    //flat.addPhoto("img/img3.jpg");
    //flat.address('пр. Ботаническая 12');
    //flat.price(70);
    //flat.currency('$');
    //catalog.addFlat(flat);
    //
    //flat = new Flat();
    //flat.setRooms(1);
    //flat.addPhoto("img/image4.jpg");
    //flat.address('Кирова 77');
    //flat.price(60);
    //flat.currency('$');
    //catalog.addFlat(flat);
    //
    //flat = new Flat();
    //flat.setRooms(1);
    //flat.addPhoto("http://img.hut.by/pictures/855900cce566a3fe5962c579779f71b696.jpg");
    //flat.addPhoto("http://img.hut.by/pictures/56488cdf92ef1d4d44ca3b126f7e8d3949.jpg");
    //flat.addPhoto("http://img.hut.by/pictures/1726b2df7c05a9a441307e9f69a7b5ba91.jpg");
    //flat.addPhoto("http://img.hut.by/pictures/6c1e55def135099b98d71728afdd3ed047.jpg");
    //flat.addPhoto("http://img.hut.by/pictures/47561613e0f444f5ec46bae7b393ac9961.jpg");
    //flat.addPhoto("http://img.hut.by/pictures/72f29ec7274c7bfdf906244ec80ecbbb82.jpg");
    //flat.addPhoto("http://img.hut.by/pictures/383c40b80c69520d81cd137ffdf7b26612.jpg");
    //flat.addPhoto("http://img.hut.by/pictures/961a20e94eb5a9a141117de5a88d59a357.jpg");
    //
    //flat.address('пр. Независимости, 75');
    //flat.price(60);
    //flat.currency('$');
    //
    //flat.addSpecification('locations', new Flat.Specification('Расположение','Центр города'));
    //flat.addSpecification('metro-stations', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    //flat.addSpecification('locations1', new Flat.Specification('Расположение','Центр города'));
    //flat.addSpecification('metro-stations1', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    //flat.addSpecification('locations2', new Flat.Specification('Расположение','Центр города'));
    //flat.addSpecification('metro-stations2', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    //flat.addSpecification('locations3', new Flat.Specification('Расположение','Центр города'));
    //flat.addSpecification('metro-stations3', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    //flat.addSpecification('locations4', new Flat.Specification('Расположение','Центр города'));
    //flat.addSpecification('metro-stations4', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    //flat.addSpecification('locations5', new Flat.Specification('Расположение','Центр города'));
    //flat.addSpecification('metro-stations5', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    //flat.addSpecification('locations6', new Flat.Specification('Расположение','Центр города'));
    //flat.addSpecification('metro-stations6', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    //flat.addSpecification('locations7', new Flat.Specification('Расположение','Центр города'));
    //flat.addSpecification('metro-stations7', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    //
    //catalog.addFlat(flat);
    //
    //flat = new Flat();
    //flat.setRooms(2);
    //flat.addPhoto("img/img3.jpg");
    //flat.address('пр. Независимости 15');
    //flat.price(90);
    //flat.currency('$');
    //
    //catalog.addFlat(flat);

    $('body').append(new Offcanvas(catalog)).append(new PhotoSwipe());

    $(document).foundation({
        offcanvas : {
            // Sets method in which offcanvas opens.
            // [ move | overlap_single | overlap ]
            open_method: 'overlap',
            // Should the menu close when a menu link is clicked?
            // [ true | false ]
            close_on_click : false
        },
        accordion : {
            toggleable: false
        }
    });

    new Navigation(catalog);
});