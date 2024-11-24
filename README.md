# flexpath-final-project

Abstract Requirements:


Restrictions:
- Once again, no use of 3rd party libraries that aren’t included in the starter code.

Frontend App Style:
- Bootstrap, Tailwind CSS, or Custom CSS
- Use the FREE version of Font Awesome version 5 to add icons in your app: https://fontawesome.com/

Testing:
- 50% test coverage on backend Java code
- 50% test coverage on frontend React and JS code

Database:
- MySQL running locally, Use MySQL workbench to directly administrate the database. Create a specific user for the app that the Java backend will use to connect to the relevant database and tables.
- Don’t let the user the Java backend uses connect to the Permissions table that determines if a user is Basic or Admin. That should be only directly controlled in the database.

Different User Permission Roles:
- Two levels of user
- Basic - Still must create account and log in, 
  - Can create a record, delete only their own records, update only their own records, read all “public” records
  - Can create a record that is “Private”, where only they can see it
- Admin - Determines higher level creation and management actions in app
  - Can create a record and mark it as “Public” or “Private”, delete any record, update any record, and read all “Public” and “Private” records.
  - Admins should be able to filter the general search feature to pull back Public and/or Private records
  - When an admin deletes or updates another user’s record, the user should be made aware of it somehow, either through email, or a notification system in the app.
  - So the next time they log in, they see anything an admin changed. Admin must provide a user with a reason why they updated or deleted their record.
- Which users have these permissions will be controlled by a database table

Creation:
- Allow users to create records for Public or Private consumption. 

Curation:
- Allow users to create a custom group of records that they can give a name and description to. These groups are just for the individual user that creates them, no need to implement a Public versus Private behavior for them.
- These groups should then be available to the user in some part of the app, where they can search through them, open a page that shows the records tied to a group, and then be able to remove records tied to this group if they want.
- In the search page, there should be an icon a user clicks that allows them to add a record to a given group. Inside this menu, there should be an option to add the record to a new group, which allows the user to provide a name and description for a new group. When they click “Add to Group” it should then create the group, and on success add the record to this new group.


Retrieval
- Have a dataset frontend users can search through
- Search should have at least 2 query param values that the dataset will be filtered against.
- Also, the search should have a keyword search that uses a LIKE comparison on the search term to find relevant results in the database. A simple `if (field.includes(keyword))` won’t be good enough.
- Run this Like comparison against any field in the search dataset that makes sense to compare a string against
- Users should be able to sort the results by different fields (Most Recent, alphabetically, etc…)
- For any more dynamic options (liable to be added to or modified over time) in the frontend (search options, record creation options) have these stored in a generic tblOptions table, and dynamically pull this list of options when your React app loads.
- Have fields along with the option itself that says if it is still available as an option, what general category the option is tied to, and a unique ID. Then on load for the react app, parse the data out accordingly to provide the options to their relevant display components.
