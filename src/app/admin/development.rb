# frozen_string_literal: true
ActiveAdmin.register_page "Development" do
  menu priority: 1, label: "開発者向けページ"

  content title: proc { "開発者向けページ" } do
    para "ここは独自ページです。"

    render partial: "admin/development/index", locals: { name: "admin test" }
  end
end
