# SourceCode

SourceCode was built as our midterm project for Lighthouse Labs. It is a resource-wall similar to Pinterest, where any visitors can view and click on resources contributed by any user. Links re-direct to the appropriate websites. 

Users can also register for an account, and then contribute their own resources, adding a Name, URL, Description, Tags, and an Image which will then be pinned to the "Resource Wall". Users can keep track of their own contributed resources in their profile page.

SourceCode was built on a NodeJS + Express framework connected to a PostgreSQL database, with front-end design using Bootstrap, jQuery, Ajax.  

![Homepage](https://github.com/grantran/sourcecode/blob/master/public/images/sourcecode_homepage.png)
![Create Resource](https://github.com/grantran/sourcecode/blob/master/public/images/sourcecode_add_resource.png)


## Installation Instructions

1. Clone this repo 
2. Create an .env file -- see .env.example for template. Use 'midterm' for database name.
3. npm install 
4. npm start -- to start the server, default port is 8080 

## Database Migration and Seeding 

Using knex, there is one migration file setup to create the schema for the database. 

`knex migrate:latest` 

This will create empty tables, and can be removed using `knex migrate:rollback`. 

If everything is good and well, there is 1 seed file that will seed `resources`, `users` and `comments`. The relationship between these tables (i.e who created which resources and who commented on which resources) is randomly generated in the seed file. 

`knex seed:run` 

A rollback migration will remove all tables / data. 

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- pg
- body-parse
- bootstrap-sass
- ejs
- knex
