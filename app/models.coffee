App = require 'app'

delim = '-'

App.Store = DS.Store.extend
  revision: 7
  adapter: DS.FixtureAdapter.extend
    simulateRemoteResponse: false

App.Node = DS.Model.extend  
  childs: DS.hasMany('App.Node')
  parent: DS.belongsTo('App.Node')
  name: (() ->
    path = @get 'id'
    parts = path.split delim
    name = parts[parts.length-1] or 'ROOT'
    name).property('id')

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
