# Key Design Goals

## Secuity
First and foremost we want to guarantee we provide proper access control, regardless of what the developer does. Data access must be such that if the developer writes a query, the execution of that query will be adjusted to enforce access control. The necessary filters (where clauses) will be added to reduce the returned data to only include data that can been seen.
Plain and simple it needs to address: https://owasp.org/www-community/Broken_Access_Control
For "findBy" requests and generic SQL that gets passed in that means we have parse the query, identify all data sources (from's) and add constraints to them and then and only then execute the query.
This has a material impact on the application and model. Summary and denormalized data often need to be called out separately and can seldom be returned with simply a sql call. For example, if you want all users to see summaries of all orders but you do not want them to see all orders then any query a user makes will only summarize the data they can see. Often, summarization constructs (views or prepropulated tables) with that summary data need to be created and then users can be given access to that.

## Flexability
At the core, the Dal layer needs to allow any arbitrary SQL to return data. It should also support, as closely as possible, data requests that may come from different consumers such as easy progammatic access from services, REST API's (with odata like options), GraphSQL requests, etc.
This should also include the ability to batch data requests and deep load data.

## Performance
### Efficient expandBy
When expandBy directives are given, the data should be loaded in bulk as much as possible. That is, each expandBy piece should require no more than 1 query to the database.
See "Example call elaborting on expandBy implementation" later on for details

### Batching
In general, the marshalling of a call from the client or a service to the data is MORE expensive than the data retrieval itself. To address this, there is a feature to allow multiple requests for data to be sent together.
For example, i want the top projects and the top investors and geography to divide them by. I should be able to send all three information requests as 1 request to the server

### Paging by default
By default all requests should return 1 and only one modest size page of data. This is an important constraint to limit run away resource usage, it forces the developer to recognize and specifically code access to large data sets. In the absence of this, arbitrarily large data sets may be returned at times without proper defensive coding practices being put in place.
To take advantage of this, all findByXXXX calls have optional parameters for which page and the page size. These parameters are generally at the end.

### Caching
The dal layer should make heavy use of object level caching. The code for this is implemented inside of the dal layer and has no external manifestion, the developer need not do anything to make use of this. 

## Model adherence
The logic data model should be truly, faithfully followed in the resulting information with recignition of the places that its beneficial to deviate. Internal id's for joins should be preserved and exposed along with the joined data itself (carefully about checking the values though). Enumerations should be presented at the enumerations, not the code that represent them. Inheritence needs to be properly followed so the base class should carry common properties and querying the base class should result in results that are the child classes.
Referential data (local fk id's and foreign fk's) need to expose methods to allow the consumer to recognize what data is, or is not, loaded without triggering a load of that data. This is to avoid needless cascade or in the case of UI usage, executon failures.

## REST API's
Due to issues with URL syntax, typical operators cannot be used (=,>,<, etc). As a result the syntax that might be a default choice is not possible. As a result, the Dal layer will parse OData like syntax for its filters and select list into the same for used by services.
To make use of this, the developer merely needs to marshall OData fitlers and select lists to the corresponding dal signatures. For example: findAllByOdataFilter(...)

## Projections 
?? select count(*) from X where y = z. do we just let this be raw sql with key value's returned?

## Example call elaborting on expandBy implementation
AllUserDal.findByFilter(
      'id in :list and orders.order_no = :first'  - the filter that turns into a where clause
      , 'orders, orders.project, transactions'    - this is the expand by, we get orders and transactions
      , array(':first' => 'CAN6353', ':list', [1,2,3])    - the parameters to supplement the filter
      , 'createtime desc'                         - the order by
      , 1, -1                                     - this is paging. if you want all regardless of size you must specify
)

we first translate that into sql with the necessary joins. critical: the joins are nOT for expand by but rather filterBy
  select * 
  from 
      fs4.all_users 
      inner join fs4.investment_orders on fs4.investment_orders.user_id = fs4.all_users.id
  where
      fs4.all_users.id in (:list_item1, :list_item2, :list_item3)
      and fs4.investment_orders.order_no = :first
we execute this query and get the results
then we add queries for the expandBy and fill in joins to the relevant expand by ** this has to be ordered such that we follow the projection path
  select *
  from 
      fs4.investment_orders
  where 
      fs4.investment_orders.user_id in ('list of distinct all_user ids from previous')
 repeat for other expand's    
  select *
  from
      fs4.projects
  where
      fs4.projects.id in ('list of distinct project_id's from orders')
  select *
  from
      fs4.investment_transactions
  where
      fs4.investment_transactions.user_id in ('list of distinct all_user ids from previous')



 