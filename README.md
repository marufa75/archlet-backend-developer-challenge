# Backend Developer Challenge

Hello, and welcome to the Archlet Backend Engineering Coding Challenge!

## Introduction

In this challenge, we would like you to design and implement an MVP for supporting the handling and storing of client data in our data import module.
When a user (also called buyer) wants to analyze a sourcing project in Archlet, they upload a so called bid sheet in Excel format.
This bid sheet contains on one side information from the buyers where they specify what they need to buy. The products that they purchase are called items. Information related to an item always includes a product name and a volume.
On the other side, the bid sheet also contains the information of the offers from the different suppliers. The offers specify the prices and specifications of the different suppliers for these items. It is not necessarily the case that each supplier has an offer for each item. Examples of bid sheets can be found in `/SampleData`.

## Goal of the Challenge

The main goal of this challenge is to design and implement a backend service that processes these bid sheets, stores the data in a database and makes them available for reading. You will need to:

1. Design and implement a database schema to store bid sheet data. `schema.prisma` provides you with a starter. Please also send us a visualization of your schema (hand drawn, drawio or any other tool).
2. Implement a logic that accepts the Excel file and stores it in the database. `./src/graphql/mutation.ts` provides you with an entry point.
3. Add basic GraphQL resolvers to access your data. For example: Let us query all items for a project.
4. (Optional) Add some tests to your solution

## Requirements

- Please use TypeScript and GraphQL as provided by this starter. Other than that, you are free to modify our code and use different libraries, if it helps.
- When you design the database schema, you need to consider the following:
  - Not every Excel is the same and contains different columns. However, all data is important to our customers. Create a schema, that can handle this.
  - Think about how you would use this data. What would be a reasonable domain model?
- We work with a multi-tenancy approach. Please consider this.
- (Out of scope) There is no need to build a frontend interface as we are mainly interested in the API response from the backend. If it helps you building & testing your backend you can do so.

## Getting started

The `GETSTARTED.md` will show you how to setup this project.

## Allowed Tools

Currently this starter provides you with a Postgres database, but for the challenge you are free to use any kind of database or persistent storage you are most familiar with. Relational databases would have preference, but also nosql databases are fine if you can defend the choice well.

## Sample Data

In the same folder as this readme you will find some sample data sets to illustrate well how different these bid sheets can look depending on the client or the use case. Use them for testing your solution.

FYI: All the data included in the files is randomly generated, so the numbers might not add up :)

## Preparation task

You will receive an invite from us to present and discuss your solution with our engineers. You should be prepared to discuss about how the schema and code should be structured. Also consider scalability, possible bottlenecks, challenges, ideas for modularity and future improvements for your solution.

## Closing Remarks

This task is designed to take 2-3 hours to complete. Please do not invest much more time than that. Instead of rushing to make sure that all the functionality is there, we would rather see clear API definitions for everything and a few well implemented parts.
This way we will have a good starting point for the review meeting. If you have any questions, do not hesitate to reach out to us.
Good luck and happy coding!



## Solution

tables
https://bit.ly/3Cbgyg3


```Graphviz (DOT)
graph ER {
	node [shape=box]; organization; project; buyer; supplier; title;
	node [shape=diamond,style=filled,color=lightgrey]; "O-P"; "P-B"; "B-S"; "P-T";

	organization -- "O-P" [label="1",len=1.00];
	"O-P" -- project [label="n",len=1.00];

	project -- "P-B" [label="1",len=1.00];
	"P-B" -- buyer [label="n",len=1.00];

	buyer -- "B-S" [label="1",len=1.00];
	"B-S" -- supplier [label="n",len=1.00];


	project -- "P-T" [label="1",len=1.00];
	"P-T" -- title [label="n",len=1.00];

	fontsize=15;
}
```


solution


  Extra Columns
    I choose this solution because I had experience of somethings similar on old project

    pre create table buyer and supplier with fixed columns 
    create a table title to remember the mapping field to label of the excel

  pro
     that works fine for performance
  cons
    you can run out of extra columns
    the same columns contains different data but if you are download the entire project on the client should not matter
    desciptive name are need to be founded on the other table title, but it is easy to manange with react

  *** other
  Entity Attribute Value
      I had also experiense on solution Entity Attribute Value that each attribute value is a separate row nut:
      too many inner join needed and to many insert you cannot have indexes, search don't scale, data type is hard ( you need again more column)

  use XML or JSON
    har query and index

  use NOSQL
    can be a solution but also here not sure







****
  for try to clean column value
  I implemented an example that if on a columns with strings that many contain a number, is possible to create a new column just with the number (called wih Extra)







sample query
```GraphQL
query   {
  project (id:"1426787c-2456-4ee5-b319-abb662e3e51f", organizationId:"2024cf11-20c6-4a45-ba9d-44ed10878c04") {
    id name titles {
        id  label field forBuyer
    } buyers {
        id txt01 int01 suppliers {
            id txt01 int01
        }
    }
  }
}
```

