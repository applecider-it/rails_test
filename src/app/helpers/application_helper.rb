module ApplicationHelper
  # 項目エラー表示
  def field_error(form, field)
    return unless form.object.errors[field].any?

    content_tag(:div, form.object.errors[field].first, class: "text-red-600")
  end
end
