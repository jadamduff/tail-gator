Rails.application.routes.draw do
  scope :api do
    post 'user_token' => 'user_token#create'
    namespace :v1 do
      post 'login' => 'sessions#create'
      get 'logout' => 'sessions#destroy'

      get 'test_data' => 'test#test_data'

      get 'product_list' => 'products#product_list'

      resources :users, only: [:create]
      get 'user_data' => 'users#user_data'

      resources :orders, only: [:create, :update, :destroy]

      resources :list_item, only: [:create, :destroy]
    end
  end
end
