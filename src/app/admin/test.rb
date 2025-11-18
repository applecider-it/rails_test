# frozen_string_literal: true
ActiveAdmin.register_page "Test" do
  menu priority: 1, label: "テストページ"

  content title: proc { "テストページ" } do
    para "ここは独自ページです。"

    render partial: "admin/test/index", locals: { name: "admin react test" }
  end
end
