const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class Contact {
	constructor(obj) {
		if(!obj)
			throw "Need object to initialize values from.";

		this.name = obj.name;
		this.age = obj.age;
		this.phone = obj.phone;
	};
  // addPhone(number) {

  //     return this.phone = number;
  // }
  get name() {
  	return this._name;
  }

  set name(name){
    if (!name){
			throw "Name is needed to create a new person.";
    }
    if (typeof name !== "string"){
      throw "Name needs to be string";
    }
    if (name.length <= 3){
      throw "Name needs to be atleast 4 characters long"
    }
  	this._name = name;
  }

  get phone(){
  	return this._phone;
  }

  set phone(number){
    if (typeof number !== 'string' && typeof number !== 'number'){
      console.log("inde: " + typeof number);
      throw "Phone number needs to be string or number";
    }
    
    let temp = number.toString();
    
    if (temp.length !== 8){
      throw "Phone number needs to be 8 digits long."
    }
    this._phone = temp;
  }

  call() {
  	if (this.phone)
  		console.log("Calling " + this.name + " at " + this.phone);
  	else
  		console.log(this.name + " has no phone number saved.");

  }
  birthday() {
  	console.log("Wishing " + this.name + " a happy " + (this.age+1) + "th birthday!");
  }
};

class ContactList {
	constructor(filename){
		this.list = [];
		this.filename = filename;
	}

	addContact(contact){
		if(contact instanceof Contact){
			this.list.push(contact);
		}
	}

	save(){
		return writeFile(this.filename, JSON.stringify(this.list), "utf8");
	}

	load(){
		const readFilePromise = readFile(this.filename, "utf8");

		return readFilePromise
		.then(fileString => {
			this.list = JSON.parse(fileString)
			.map(contactObj => new Contact(contactObj));

			return Promise.resolve(null);
		});
		// return new Promise((resolve, reject) => {
		// 	readFilePromise
		// 	.then(fileString => {
		// 		this.list = JSON.parse(fileString)
		// 		.map(contactObj => new Contact(contactObj));

		// 		resolve(null);
		// 	});
		// });
	}
};

exports.Contact = Contact;
exports.ContactList = ContactList;