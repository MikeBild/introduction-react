const user = {
  name: '',
};

const { name: username, password = 'secret' } = user;

const account = {
  username,
  password,
  debug() {
    console.log({ account: this });
  },
};

account.debug();

const profile = { ...account, ...user, id: Date.now() };
profile.debug();
console.log({ profile });

const userList = [user, user, user];

const [firstItem = {}, ...allOthers] = userList;
console.log({ firstItem, allOthers });

const userList2 = [{ id: 'sks' }, ...userList, { id: 'slsks' }, ...userList];
