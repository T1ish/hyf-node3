"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require("fs");
var util = require("util");

var writeFile = util.promisify(fs.writeFile);
var readFile = util.promisify(fs.readFile);

var Contact = function () {
  function Contact(obj) {
    _classCallCheck(this, Contact);

    if (!obj) throw "Need object to initialize values from.";

    this.name = obj.name;
    this.age = obj.age;
    this.phone = obj.phone;
  }

  _createClass(Contact, [{
    key: "call",
    value: function call() {
      if (this.phone) console.log("Calling " + this.name + " at " + this.phone);else console.log(this.name + " has no phone number saved.");
    }
  }, {
    key: "birthday",
    value: function birthday() {
      console.log("Wishing " + this.name + " a happy " + (this.age + 1) + "th birthday!");
    }
  }, {
    key: "name",

    // addPhone(number) {

    //     return this.phone = number;
    // }
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      if (!name) {
        throw "Name is needed to create a new person.";
      }
      if (typeof name !== "string") {
        throw "Name needs to be string";
      }
      if (name.length <= 3) {
        throw "Name needs to be atleast 4 characters long";
      }
      this._name = name;
    }
  }, {
    key: "phone",
    get: function get() {
      return this._phone;
    },
    set: function set(number) {
      if (typeof number !== 'string' && typeof number !== 'number') {
        console.log("inde: " + (typeof number === "undefined" ? "undefined" : _typeof(number)));
        throw "Phone number needs to be string or number";
      }

      var temp = number.toString();

      if (temp.length !== 8) {
        throw "Phone number needs to be 8 digits long.";
      }
      this._phone = temp;
    }
  }]);

  return Contact;
}();

;

var ContactList = function () {
  function ContactList(filename) {
    _classCallCheck(this, ContactList);

    this.list = [];
    this.filename = filename;
  }

  _createClass(ContactList, [{
    key: "addContact",
    value: function addContact(contact) {
      if (contact instanceof Contact) {
        this.list.push(contact);
      }
    }
  }, {
    key: "save",
    value: function save() {
      return writeFile(this.filename, JSON.stringify(this.list), "utf8");
    }
  }, {
    key: "load",
    value: function load() {
      var _this = this;

      var readFilePromise = readFile(this.filename, "utf8");

      return readFilePromise.then(function (fileString) {
        _this.list = JSON.parse(fileString).map(function (contactObj) {
          return new Contact(contactObj);
        });

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
  }]);

  return ContactList;
}();

;

exports.Contact = Contact;
exports.ContactList = ContactList;
//# sourceMappingURL=ContactList.js.map