Rails.application.routes.draw do
  resources :posts
  resources :tags
  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Defines the root path route ("/")
  # root "articles#index"
end
