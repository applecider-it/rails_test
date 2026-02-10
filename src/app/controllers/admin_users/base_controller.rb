# frozen_string_literal: true

class AdminUsers::BaseController < Devise::SessionsController
  layout "admin/layouts/application"
end
