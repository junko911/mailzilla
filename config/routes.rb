Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :campaigns
      resources :campaigns do
        member do
          post 'send_test'
        end
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
