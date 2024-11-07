const ignore = ['']

// TODO:
// when we get admin credentials, refactor for this
//   const args = {
//     customer: 'my_customer',
//     orderBy : 'givenName'
//   };
//    const response = AdminDirectory.Users.list(args);

function directory() {
  const args = {
    sources: ['DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE'],
    mergeSources: ['DIRECTORY_MERGE_SOURCE_TYPE_CONTACT'],
    readMask: 'emailAddresses,names,photos,occupations,organizations,skills,locations,phoneNumbers'
  };

  try {
    const response = People.People.listDirectoryPeople(args)
    let users = response.people.filter((user) => !ignore.includes(user.names[0].displayName));

    if (!users || users.length === 0) {
      console.log('No users found.');
      return;
    }

    users.sort((a,b) => (a.names[0].displayName > b.names[0].displayName) ? 1 : ((b.names[0].displayName > a.names[0].displayName) ? -1 : 0));

    return users;
  } catch (err) {
    // TODO (developers) - Handle exception
    console.log('Failed to get the contact group with an error %s', err.message);
  }
}