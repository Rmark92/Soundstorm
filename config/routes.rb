Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: 'json' } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show, :update]
    resources :tracks, only: [:index, :create, :show, :update, :destroy] do
      resources :likes, only: [:create]
      resources :plays, only: [:create]
      delete '/likes', to: 'likes#destroy'
      resources :comments, only: [:create, :destroy]
    end
    resources :search, only: [:index]
  end
end
