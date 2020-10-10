Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :contacts do
        patch "add_segment"
        patch "remove_segment"
      end
      resources :segments
      resources :campaigns do
        member do
          patch "send_test"
        end
        collection do
          get :templates
        end
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
