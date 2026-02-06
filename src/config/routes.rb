Rails.application.routes.draw do
  # チャット
  get "chat/index"
  post "chat/store_ac"
  post "chat/store_redis"

  # ツイート
  get "tweets_js/index"
  resources :tweets

  # 管理画面
  scope "/admin_secret" do
    devise_for :admin_users, controllers: {
      sessions: 'admin_users/sessions',
      passwords: 'admin_users/passwords',
    }
  end

  scope path: "/admin_secret", as: "admin", module: "admin" do
    get "", to: "home#index"
    resources :users, except: [:show]
  end

  # ユーザー関連
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    confirmations: 'users/confirmations',
    unlocks: 'users/unlocks',
    #omniauth_callbacks: "users/omniauth_callbacks"
  }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "home#index"

  # 開発者向けページ
  get "development/index"
  get "development/ruby_test"
  get "development/javascript_test"
  post "api/development/go_api_test"
  get "development/websocket_test"
end
