App = require 'app'

nodeDelimiter = '-'

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

DS.Adapter.registerTransform('JSON',
  fromJSON: (serialized)->
    serialized
  toJSON: (deserialized)->
    deserialized)

App.Node = DS.Model.extend
  childNodes: DS.hasMany 'App.Node'
  childStates: DS.hasMany 'App.State'
  parent: DS.belongsTo 'App.Node'
  name: (() ->
    path = @get 'id'
    parts = path.split nodeDelimiter
    parts[parts.length-1] or 'ROOT').property 'id'

App.State = DS.Model.extend
  parent: DS.belongsTo 'App.Node'
  name: (() ->
    path = @get 'id'
    parts = path.split nodeDelimiter
    parts[parts.length-1] or 'ROOT').property 'id'
  value: DS.attr 'JSON'
  schema: DS.attr 'JSON'

initFixture = () ->
  App.Node.FIXTURES = [{id: 'ROOT', childNodes: ['abc','def']},
    {id: 'abc', childNodes: ['abc' + nodeDelimiter + 'blabla']},
    {id: 'def', childNodes: ['def' + nodeDelimiter + 'hoho']},
    {id: 'abc' + nodeDelimiter + 'blabla', childNodes: [], childStates: ['abc' + nodeDelimiter + 'blabla' + nodeDelimiter + 'testState']},
    {id: 'def' + nodeDelimiter + 'hoho', childNodes: []}]

  App.State.FIXTURES = [{id: 'abc' + nodeDelimiter + 'blabla' + nodeDelimiter + 'testState',
  value: {a:123,b:444},schema:{}}]

  parentPath = (path) ->
    parts = path.split nodeDelimiter    
    if parts.length > 1 
      parent = parts[0..parts.length-2].join nodeDelimiter
    else
      parent = 'ROOT'
              
  for fixture in App.Node.FIXTURES
    fixture.parent = parentPath fixture.id

  for fixture in App.State.FIXTURES
    fixture.parent = parentPath fixture.id

    
initFixture()