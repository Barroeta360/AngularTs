"use strict";
project.directive('carousel', function () {
    return {
        restrict: 'E',
        scope: {
            interval: '=',
            controls: '=',
            refers: '=',
            slides: '=',
            cname: '=',
            cclass: '=',
            caption: '='
        },
        templateUrl: 'includes/directives/carousel.html',
        link: function (scope, iElement, iAttrs) {
            if (typeof scope.caption != 'boolean') {
                scope.caption = true;
            }
            var Slide = (function () {
                function Slide() {
                    this.image = '';
                    this.title = '';
                    this.text = '';
                    this.show = false;
                    this.id = 0;
                }
                return Slide;
            }());
            scope.items = [];
            var i = 1;
            scope.slides.forEach(function (s) {
                var item = new Slide();
                item.image = s.image;
                item.text = s.text;
                item.title = s.title;
                item.id = s.id;
                if (i == 1)
                    item.show = true;
                scope.items.push(item);
                i++;
            });
            console.log(scope.items);
            var currentItem = 1;
            var slideSize = scope.items.length;
            function addShow(i) {
                var id = scope.items[i].id;
                id = '#' + scope.cname + '-' + id;
                $(id).addClass('show');
            }
            function interval() {
                return setInterval(function () {
                    cleanSlides();
                    if (currentItem < slideSize) {
                        currentItem++;
                    }
                    else {
                        currentItem = 1;
                    }
                    addShow(currentItem - 1);
                }, scope.interval);
            }
            function cleanSlides() {
                var id = '#' + scope.cname + ' .item';
                $(id).removeClass('show');
            }
            var cInterval = interval();
            scope.control = function (action) {
                cleanSlides();
                clearInterval(cInterval);
                if (action == 1) {
                    if (currentItem < slideSize) {
                        currentItem++;
                    }
                    else {
                        currentItem = 1;
                    }
                }
                else {
                    if (currentItem != 1) {
                        currentItem--;
                    }
                    else {
                        currentItem = slideSize;
                    }
                }
                addShow(currentItem - 1);
                cInterval = interval();
            };
        }
    };
});
