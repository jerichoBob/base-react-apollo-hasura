# base-react-apollo-hasura

The purpose of this project is to create a super-simple react app that pulls data from a graphql store served up on hasura. Hasura simply because it allowed me to get started quickly.

The app displays a list of names in a scrolling list of individual react components/cards. which means I'll probably need something like reactmd. when you select a name, it will display a card with the following details:
   * Name (first, last)
   * Address (number, street, city, state, zip)
   * Birth date (month, day, year)

Hasura setup
I like Hasura because I like GraphQL but I didn't want to go through the hassle during the prototyping stage of setting up the resolvers, etc. Hasura does that literally "for free" and once I need more I can export and build my own, or pay them and charge people to use the app :) 

I didn't do much for the initial Hasura setup.

1. I created a database
2. I created a table
3. I created a basic schema for people
4. I inserted 2 rows of data to represent my 2 clients

The tech stack so far looks like this:

* Hasura
* Apollo Client
  * don't forget to set the headers or you won't be able to access the data
* ReactMD - because I like the clean look of MD and these components

