App = require 'app'

delim = '-'

App.Store = DS.Store.extend
  revision: 7
  adapter: DS.FixtureAdapter.extend
    simulateRemoteResponse: false,
    find: (store,type,id) ->
      console.log 'find',id
      @_super(store,type,id)
    findQuery: (store, type, query, modelArray) ->
      console.log 'findQuery',JSON.stringify(query)
      @_super(store,type,query,modelArray)
    findAll: (type) ->
      console.log 'findAll',type
      @_super(type)
    findMany: (type, ids, record, relationship) ->
      console.log 'findMany',ids,record,relationship
      @_super(type, ids, record, relationship)
    findById: (type,id) ->
      console.log 'findById',id
      @_super(type,id)
    findByClientId: (type,id) ->
      console.log 'findByClientId',id
      @_super(type,id)


App.Node = DS.Model.extend  
  childs: DS.hasMany('App.Node')
  parent: DS.belongsTo('App.Node')
  name: (() ->
    path = @get 'id'
    parts = path.split delim
    parts[parts.length-1] or 'ROOT').property('id')

initFixture = () ->
  App.Node.FIXTURES = [{id: 'ROOT', childs: ['abc','def']},
    {id: 'abc', childs: ['abc' + delim + 'blabla']},
    {id: 'def', childs: ['def' + delim + 'hoho']},
    {id: 'abc' + delim + 'blabla', childs: []},
    {id: 'def' + delim + 'hoho', childs: []}]

  parentPath = (path) ->
    parts = path.split delim    
    if parts.length > 1 
      parent = parts[0..parts.length-2].join delim
    else
      parent = 'ROOT'
              
  for fixture in App.Node.FIXTURES
    fixture.parent = parentPath fixture.id
    
initFixture()