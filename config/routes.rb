Rails.application.routes.draw do
  scope :api do
    post 'user_token' => 'user_token#create'
    namespace :v1 do
      post 'login' => 'sessions#create'
      get 'logout' => 'sessions#destroy'

      get 'test_data' => 'test#test_data'

      resources :users, only: [:create]
    end
  end
end
