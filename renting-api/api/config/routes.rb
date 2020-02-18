Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/list', to: 'renting#list'
  get '/list/by-client-id/:id', to: 'renting#list_by_client_id'
  post '/register', to: 'renting#register'
  put '/return/:id', to: 'renting#return'
end
