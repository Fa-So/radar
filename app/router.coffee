App = require 'app'

App.Router = Em.Router.extend
  enableLogging: true
  root: Em.Route.extend        
    index: Em.Route.extend
      route: '/'
      connectOutlets: (router) ->
        router.transitionTo 'node',App.Node.find('abc-blabla')
        
    node: Em.Route.extend
      route: '/:node_id'
      connectOutlets: (router,node) ->
        router.set('nodeController.content',node)
        router.get('applicationController').connectOutlet('node')

    showNode: (router,event) ->
      path = event.context
      router.transitionTo('node',App.Node.find(path))
        
