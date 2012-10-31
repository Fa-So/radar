App = require 'app'

App.store = DS.Store.create
    revision: 4,
    adapter: 'DS.fixtureAdapter'


App.TreeElement = DS.Model.extend
	primaryKey: 'path'
	path: DS.attr 'string'

App.Node = App.TreeElement.extend
	childs: DS.hasMany(App.TreeElement,key:'childs')

App.State = App.TreeElement.extend
	value: DS.attr 'string'

App.TreeElement.reopen
	parent: DS.belongsTo(App.Node,key:'parent')
  
App.Node.FIXTURES = [{path: '',parent: ''}
	{path: 'abc', parent: ''}
	{path: 'abc.blabla', parent: 'abc'}
	{path: 'abc.foo', parent: 'abc'}
	{path: 'def', parent: ''}
	{path: 'def.porsche', parent: 'def'}
	{path: 'def.benz', parent: 'def'}]

App.State.FIXTURES = [{path: 'abc.stateA',parent: 'abc',value: '123'}
	{path: 'abc.stateB',parent: 'abc',value: 'true'}
	{path: 'def.porsche.driver', parent: 'def.porsche',value: '"gooody"'}]

