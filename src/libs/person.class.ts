class PersonList {
    ss:any;
    list:Person[] = [];
    person:Person;
    index:number;
    
    constructor (sessionStorage:any) {
        this.ss = sessionStorage;
        this.getListPerson();
        this.person = new Person({name:'',lastname:'',age:0,id:0,state:''});
        this.index = 0;
    }
    
    addPerson:Function = (person:iPerson) => {
        this.person = new Person(person);
        this.list.push(this.person);
        this.saveList();
        this.setNewPerson();
    }
    
    deletePerson:Function = (index:number) => {
        this.list.splice(index,1);
        this.saveList();
    }
    
    saveList:Function = () => {
        if(this.list){
            this.ss.personList = this.list;
        }
    }
    
    setNewPerson:Function = () => {
        this.person = new Person({name: '',lastname:'',age:0,id:0,state:''});
    }
    
    getListPerson:Function = () => {
        if(this.ss.personList) {
            this.list = this.ss.personList;
        }
    }
    
    editPerson:Function = (person:Person,index:number) => {
        this.person = person;
        this.index = index;
    }
    
    saveEditPerson:Function = () => {
        let editedPerson:Person = new Person(this.person)
        this.list[this.index] = editedPerson;
        this.saveList();
        this.setNewPerson();
    }
}


class Person {
    name:string;
    lastname:string;
    age:number;
    id:number;
    state:string;
    
    constructor(person:iPerson){
        this.name = person.name;
        this.lastname = person.lastname;
        this.state = person.state;
        this.id = person.id;
        this.age = person.age;
    }
}