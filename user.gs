/**
 * user component functions are for doing user related stuff before rendering the html
 */

function userContactComponent(user) {
  return render('_user_contact_component', { 
    email: user.emailAddresses[0].value, 
    phoneNumbers: user.phoneNumbers
  });
}

function userOrganizationComponent(user) {
  // do nothing if no organizations present
  if (!user.organizations) return;

  return render('_user_organization_component', { 
    department: user.organizations[0].department, 
    title: user.organizations[0].title 
  });
}

function userPhotoComponent(user) {
  // do nothing if no photos
  if (!user.photos) return;

  // get the url of the first photo
  const url = user.photos[0].url
  // edit the url string to improve image quality
  // this replace s=100 with s=300 to increase size from 100px to 300px
  const src = url.slice(0, -3) + "300";

  return render('_user_photo_component', { src: src})
}

/**
 * search strings are a combination of the user’s searchable attributes
 * assigned to a data-search-string attribute in the DOM
 * used by the searchString function within our javascript 
 */

function userSearchSting(user) {
  // search user full names
  let string = user.names[0].unstructuredName;

  // only add organization data to the string if it's available 
  if (user.organizations) {
    string += ' ' + user.organizations[0].department + ' ' + user.organizations[0].title;
  }

  // address casing
  return string.toLowerCase();
}
