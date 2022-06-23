# base-react-apollo-hasura

## Purpose
The purpose of this project is to create a super-simple react app that pushes/pulls data to/from a graphql store served up on Hasura. Why Hasura? Because it allowed me to get started quickly (and I don't have to futz with resolvers cuz Im lazy :))

The app displays a list of names in a scrolling list of individual react components/cards. which means I'll probably need something like reactmd. when you select a name, it will display a card with the following details:
   * Name (first, last)
   * Address (number, street, city, state, zip)
   * Birth date (month, day, year)

## Hasura setup
I like Hasura because I like GraphQL but I didn't want to go through the hassle during the prototyping stage of setting up the resolvers, etc. Hasura does that literally "for free" and once I need more I can export and build my own, or pay them and charge people to use the app :).

I didn't do much for the initial Hasura setup.

1. I created a database
2. I created a table
3. I created a basic schema for people
4. I inserted 2 rows of data to represent my 2 clients

Kinda like this:
![Hasura](/public/hasura-db.png)

The tech stack so far looks like this:

* **Hasura** - for the back-end database/tables and the GraphQL Serverside API
* **Apollo Client** - great library (duh) for talking GraphQL
  * note: don't forget to set the headers or the API won't allow your request to get through
    * content-type: application-json
    * x-hasura-admin-secret: base64-encoded secret
* **MUI** - because I like the clean look of MD and this library is easy and stable
* 

# Features
This is all future-state stuff - please ignore.
* Client Info
  * Name
  * Address
  * Phone
* Description of dress
* Event type
  * Wedding
  * Debutante
* Date of Event
* Source
  * Kannons
  * Website / FB
  * Gowns Going Green
  * Other
* Jobs
  * Job type -- needs input from Lacey
    * alteration
      * ? 
      * ?
    * Custom Build
      * ?
      * ?
  * Measurements
  * Hours Estimated
    * range of times based on previous jobs to select from
  * Hours spent
  * $ Cost
    * estimated $ amount for the job
    * actual $ amount spent for the job 
    * calculate $/hr rate (for job type)
* Gallery
  * Before
  * After