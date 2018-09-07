"use strict";
var PersonList = (function () {
    function PersonList(sessionStorage) {
        var _this = this;
        this.list = [];
        this.addPerson = function (person) {
            _this.person = new Person(person);
            _this.list.push(_this.person);
            _this.saveList();
            _this.setNewPerson();
        };
        this.deletePerson = function (index) {
            _this.list.splice(index, 1);
            _this.saveList();
        };
        this.saveList = function () {
            if (_this.list) {
                _this.ss.personList = _this.list;
            }
        };
        this.setNewPerson = function () {
            _this.person = new Person({ name: '', lastname: '', age: 0, id: 0, state: '' });
        };
        this.getListPerson = function () {
            if (_this.ss.personList) {
                _this.list = _this.ss.personList;
            }
        };
        this.editPerson = function (person, index) {
            _this.person = person;
            _this.index = index;
        };
        this.saveEditPerson = function () {
            var editedPerson = new Person(_this.person);
            _this.list[_this.index] = editedPerson;
            _this.saveList();
            _this.setNewPerson();
        };
        this.ss = sessionStorage;
        this.getListPerson();
        this.person = new Person({ name: '', lastname: '', age: 0, id: 0, state: '' });
        this.index = 0;
    }
    return PersonList;
}());
var Person = (function () {
    function Person(person) {
        this.name = person.name;
        this.lastname = person.lastname;
        this.state = person.state;
        this.id = person.id;
        this.age = person.age;
    }
    return Person;
}());
