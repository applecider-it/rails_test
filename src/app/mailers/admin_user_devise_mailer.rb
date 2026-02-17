class AdminUserDeviseMailer < Devise::Mailer
  def headers_for(action, opts)
    super.merge!(template_path: 'admin/admin_users/mailer')
  end
end