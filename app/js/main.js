/**
 * Created by aliaksei on 02/08/14.
 */

define([
    'hutby/ui/offcanvas/Offcanvas',
    'hutby/common/Navigation',
    'hutby/common/Flat',
    'hutby/common/Catalog',
    'jquery',
    'foundation',
    'foundation.offcanvas',
    'foundation.accordion'
], function(
    Offcanvas,
    Navigation,
    Flat,
    Catalog,
    $) {

    Foundation.global.namespace = '';
    Foundation.utils.register_media('small', 'foundation-mq-small');
    Foundation.utils.register_media('medium', 'foundation-mq-medium');

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

    var catalog = new Catalog();

    var flat = new Flat();
    flat.setRooms(1);
    flat.addPhoto("img/deluxe_room.jpeg");
    flat.addPhoto("img/image4.jpg");
    flat.addPhoto("img/zgrada_zaton47.jpg");
    flat.addPhoto("img/img3.jpg");
    flat.addPhoto("img/deluxe_room.jpeg");
    flat.addPhoto("img/image4.jpg");
    flat.setAddress('Сурганова 90');
    flat.setCost('60$');
    catalog.addFlat(flat);

    flat = new Flat();
    flat.setRooms(1);
    flat.addPhoto("img/zgrada_zaton47.jpg");
    flat.setAddress('пр. Независимости 75');
    flat.setCost('50$');
    catalog.addFlat(flat);

    flat = new Flat();
    flat.setRooms(1);
    flat.addPhoto("img/deluxe_room.jpeg");
    flat.addPhoto("img/image4.jpg");
    flat.addPhoto("img/zgrada_zaton47.jpg");
    flat.addPhoto("img/img3.jpg");
    flat.addPhoto("img/deluxe_room.jpeg");
    flat.addPhoto("img/image4.jpg");
    flat.addPhoto("img/zgrada_zaton47.jpg");
    flat.addPhoto("img/img3.jpg");
    flat.setAddress('пр. Ботаническая 12');
    flat.setCost('70$');
    catalog.addFlat(flat);

    flat = new Flat();
    flat.setRooms(1);
    flat.addPhoto("img/image4.jpg");
    flat.setAddress('Кирова 77');
    flat.setCost('60$');
    catalog.addFlat(flat);

    flat = new Flat();
    flat.setRooms(1);
    flat.addPhoto("http://img.hut.by/pictures/855900cce566a3fe5962c579779f71b696.jpg");
    flat.addPhoto("http://img.hut.by/pictures/56488cdf92ef1d4d44ca3b126f7e8d3949.jpg");
    flat.addPhoto("http://img.hut.by/pictures/1726b2df7c05a9a441307e9f69a7b5ba91.jpg");
    flat.addPhoto("http://img.hut.by/pictures/6c1e55def135099b98d71728afdd3ed047.jpg");
    flat.addPhoto("http://img.hut.by/pictures/47561613e0f444f5ec46bae7b393ac9961.jpg");
    flat.addPhoto("http://img.hut.by/pictures/72f29ec7274c7bfdf906244ec80ecbbb82.jpg");
    flat.addPhoto("http://img.hut.by/pictures/383c40b80c69520d81cd137ffdf7b26612.jpg");
    flat.addPhoto("http://img.hut.by/pictures/961a20e94eb5a9a141117de5a88d59a357.jpg");

    flat.setAddress('пр. Независимости, 75');
    flat.setCost('60-65$');

    flat.addSpecification('locations', new Flat.Specification('Расположение','Центр города'));
    flat.addSpecification('metro-stations', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    flat.addSpecification('locations1', new Flat.Specification('Расположение','Центр города'));
    flat.addSpecification('metro-stations1', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    flat.addSpecification('locations2', new Flat.Specification('Расположение','Центр города'));
    flat.addSpecification('metro-stations2', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    flat.addSpecification('locations3', new Flat.Specification('Расположение','Центр города'));
    flat.addSpecification('metro-stations3', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    flat.addSpecification('locations4', new Flat.Specification('Расположение','Центр города'));
    flat.addSpecification('metro-stations4', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    flat.addSpecification('locations5', new Flat.Specification('Расположение','Центр города'));
    flat.addSpecification('metro-stations5', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    flat.addSpecification('locations6', new Flat.Specification('Расположение','Центр города'));
    flat.addSpecification('metro-stations6', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));
    flat.addSpecification('locations7', new Flat.Specification('Расположение','Центр города'));
    flat.addSpecification('metro-stations7', new Flat.Specification('Рядом метро','Ст. метро Октябрьская (2 мин. пешком)'));

    catalog.addFlat(flat);

    flat = new Flat();
    flat.setRooms(2);
    flat.addPhoto("img/img3.jpg");
    flat.setAddress('пр. Независимости 15');
    flat.setCost('90$');

    catalog.addFlat(flat);

    $('body').append(new Offcanvas(catalog));

    var navigation = new Navigation(catalog);
    navigation.initializeEvents();
});