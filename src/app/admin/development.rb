# frozen_string_literal: true
ActiveAdmin.register_page "Development" do
  menu false

  content title: proc { "開発者向けページ" } do
    para "ここは独自ページです。"

    render partial: "admin/development/index", locals: { name: "admin test" }
  end
end
