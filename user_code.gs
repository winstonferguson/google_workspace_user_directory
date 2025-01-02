function readList({pageToken: pageToken}, page = 1){
  // return getList({pageToken: pageToken}, page);
  // check cache
  const cache = CacheService.getScriptCache();
  const cached = cache.get(`directory-v23-${page}`);
  if (cached != null) {
    return JSON.parse(cached);
  }
  
  return getList({pageToken: pageToken}, page);
}


/**
 * getList retrieves a specified number of users from the admin directory.
 * It is used in JavaScript to load users for the directory and accepts a page token in its parameters to fetch subsequent pages.
 */

function getList(params = {}, page = 1) {
  let args = {
    customer: 'my_customer',
    fields: 'nextPageToken, users.customSchemas, users.name.fullName, users.notes, users.primaryEmail, users.phones, users.organizations, users.thumbnailPhotoUrl',
    maxResults: 36,
    orderBy : 'givenName',
    projection: 'full'
  }

  try {
    // return AdminDirectory.Users.list({...args, ...params});
    const response = AdminDirectory.Users.list({...args, ...params});
    const cache = CacheService.getScriptCache();
    cache.put(`directory-v23-${page}`, response, 21600)

    return response;

    } catch (err) {
      // TODO (developers) - Handle exception
      console.log('Failed with error %s', err.message);
    }
}

/**
 * we have a custom schema to exclude users from the directory
 */

function filteredUsers(users) {
  return users.filter((user) => user.customSchemas == undefined || user.customSchemas.Intranet.Exclude == false);
}

/**
 * functions for doing user related stuff before rendering the html
 */

function userIntroduction(user) {
  const content = user?.notes?.value || ""

  return render('user_introduction', { 
    content: content
  });
}

function userOrganization(user) {
  // do nothing if no organizations present
  if (!user.organizations) return;

  return render('user_organization', { 
    department: user.organizations[0].department, 
    title: user.organizations[0].title 
  });
}

function userPhoto(user) {
  // do nothing if no photos
  if (!user.thumbnailPhotoUrl) return;

  // get the url of the first photo
  const url = user.thumbnailPhotoUrl
  // edit the url string to improve image quality
  // this replace s=100 with s=300 to increase size from 100px to 300px
  const src = url.slice(0, -4) + "300";

  return render('user_photo', { src: src})
}

/**
 * search strings are a combination of the user’s searchable attributes
 * assigned to a data-search-string attribute in the DOM
 * used by the searchString function within our javascript 
 */

function userSearchString(user) {
  // search user full names
  let string = user.name.fullName;

  // only add organization data to the string if it's available 
  if (user.organizations) {
    string += ' ' + user.organizations[0].department + ' ' + user.organizations[0].title;
  }

  // address casing
  return string.toLowerCase();
}