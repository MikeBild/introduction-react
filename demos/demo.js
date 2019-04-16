function User(n = 'default') {
  this.name = n;
  this.show = () => {
    console.log(this.name);
  };
}

User.create = function() {
  return new User('default');
};

User.prototype.debug = function() {
  console.log('DEBUG');
  console.log(this);
};

const user1 = new User();
user1.show();
user1.debug();
const user3 = User.create();

const user2 = new User('Peter');
user2.show();

console.log({ user1, user2 });

class Empty {
  constructor() {
    this.empty = '';
  }
}

class Address extends Empty {
  constructor(street) {
    super();
    this.street = street;
  }

  show() {
    console.log(this.street);
  }
}

const address1 = new Address();
const address2 = new Address('bar');

address1.show();
address2.show();
