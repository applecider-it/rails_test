class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # 継承先のモデルで上書きして非表示カラムを指定
  def self.hidden_attributes
    []
  end

  # インスタンス側からも参照できるように
  def hidden_attributes
    self.class.hidden_attributes
  end

  # as_json / to_json / serializable_hash に反映
  def serializable_hash(options = {})
    if hidden_attributes.present?
      # 副作用しないように、options[:except]に配列を用意
      options = options.try(:dup) || {}
      options[:except] = Array(options[:except]).dup
    
      options[:except].concat hidden_attributes
    end

    super(options)
  end
end
